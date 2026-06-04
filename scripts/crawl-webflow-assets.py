#!/usr/bin/env python3
"""Crawl tad-website-2-0.webflow.io and emit asset inventory + TSV manifest."""

from __future__ import annotations

import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

BASE = "https://tad-website-2-0.webflow.io"
ROOT = Path(__file__).resolve().parent.parent
SCRIPTS = ROOT / "scripts"

ROUTES = [
    "",
    "about",
    "about-two",
    "services",
    "service-one",
    "service-two",
    "service-details",
    "portfolio",
    "portfolio-two",
    "portfolio-details/kings-enterprise-nv",
    "portfolio-details/smart-connexxionz",
    "portfolio-details/the-coffee-box",
    "portfolio-details/devinas-enterprises",
    "careers",
    "contact-one",
    "contact-two",
    "contact-us",
    "blog",
    "blog-two",
    "home-two",
    "home-three",
]

ASSET_RE = re.compile(
    r"https://cdn\.prod\.website-files\.com/[^\"'\s<>]+\."
    r"(?:png|jpe?g|webp|svg|gif|mp4|avif)",
    re.I,
)
LINK_RE = re.compile(r'href="(/[^"#?]+)"')

# Canonical local paths for Tier-1 TAD assets (basename -> public path)
LOCAL_MAP: dict[str, str] = {
    "Logomark.png": "brand/logomark.png",
    "TAD-Logo-OriginalWit.png": "brand/logo-white.png",
    "Team Member 1.webp": "team/member-1.webp",
    "Team Member 2.webp": "team/member-2.webp",
    "Team Member 3.webp": "team/member-3.webp",
    "Team Member 4.webp": "team/member-4.webp",
    "tad-group-1.png.jpeg": "team/group-1.jpeg",
    "tad-group-2.png.jpeg": "team/group-2.jpeg",
    "tad-group-3.png.jpeg": "team/group-3.jpeg",
    "service-1.png": "services/web-development.png",
    "mobile.png": "services/mobile-development.png",
    "marketing.png": "services/digital-marketing.png",
    "e-commerce.png": "services/e-commerce.png",
    "services.png": "services/services-hero.png",
    "about.jpg": "about/about-hero.jpg",
    "TAD-assets.png": "about/tad-assets.png",
    "Business Goal Image One.webp": "about/business-goal-one.webp",
    "Business Goal Image Two.webp": "about/business-goal-two.webp",
    "Business Goal Image Three.webp": "about/business-goal-three.webp",
    "career.jpg": "careers/career.jpg",
    "Get in touch contact.webp": "contact/get-in-touch.webp",
    "Contact Two CTA.avif": "contact/book-cta.avif",
    "Review 1.avif": "reviews/review-1.avif",
    "Review 2.avif": "reviews/review-2.avif",
    "Review 3.avif": "reviews/review-3.avif",
    "Client 1.webp": "reviews/client-1.webp",
    "Client 2.webp": "reviews/client-2.webp",
    "Client 3.webp": "reviews/client-3.webp",
    "Client 4.webp": "reviews/client-4.webp",
    "kings.jpg": "projects/screenshots/kings-enterprises.jpg",
    "Smart_Connexxionz_concept_1.jpg": "projects/screenshots/smart-connexxionz.jpg",
    "Kings_Enterprises_NV_concept_1.jpg": "projects/screenshots/kings-enterprises-concept.jpg",
    "smartc.jpg": "projects/screenshots/smart-connexxionz-thumb.jpg",
    "Coffee_Box_concept_1.jpg": "projects/screenshots/the-coffee-box.jpg",
    "Devinas_Enterprises.jpg": "projects/screenshots/devinas-enterprises.jpg",
    "Hotel.webp": "projects/screenshots/queens-hotel.webp",
    "Portfolio 2.webp": "projects/gallery/the-coffee-box-2.webp",
    "Portfolio 8.webp": "projects/gallery/devinas-enterprises-8.webp",
}


def fetch(path: str) -> str:
    url = urllib.parse.urljoin(BASE + "/", path.lstrip("/"))
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8", "replace")


def canonical(url: str) -> str:
    u = url.replace("%2F", "/").replace("%2520", " ").replace("%20", " ")
    u = re.sub(r"-p-\d+(?=\.(png|jpe?g|webp|avif))", "", u, flags=re.I)
    return u


def basename(url: str) -> str:
    return urllib.parse.unquote(url.split("/")[-1])


def suggested_local(url: str) -> str:
    name = basename(canonical(url))
    if name in LOCAL_MAP:
        return f"public/{LOCAL_MAP[name]}"
    if "67547d896ca857205d0d89a6" not in url and "67547d896ca857205d0d8a25" not in url:
        return ""
    return ""


def main() -> None:
    discovered_routes: set[str] = set(ROUTES)
    try:
        home = fetch("")
        for m in LINK_RE.findall(home):
            if m.startswith("/") and not m.startswith("//"):
                discovered_routes.add(m.strip("/"))
    except OSError as e:
        print(f"warn: could not expand routes from home: {e}")

    page_assets: dict[str, list[str]] = {}
    errors: list[dict[str, str]] = []

    for route in sorted(discovered_routes):
        try:
            html = fetch(route)
            urls = sorted({canonical(u) for u in ASSET_RE.findall(html)})
            page_assets[route or "home"] = urls
        except OSError as e:
            errors.append({"route": route or "home", "error": str(e)})

    unique = sorted({u for urls in page_assets.values() for u in urls})
    canon_groups: dict[str, list[str]] = {}
    for u in unique:
        canon_groups.setdefault(canonical(u), []).append(u)

    inventory = {
        "base": BASE,
        "pages": {k: len(v) for k, v in page_assets.items()},
        "page_assets": page_assets,
        "unique": unique,
        "canonical": canon_groups,
        "errors": errors,
    }

    inv_path = SCRIPTS / "webflow-asset-inventory.json"
    inv_path.write_text(json.dumps(inventory, indent=2), encoding="utf-8")

    tsv_lines = ["canonical_url\tbasename\tsuggested_public_path\tpages"]
    for c_url in sorted(canon_groups):
        b = basename(c_url)
        local = suggested_local(c_url)
        pages = [
            p
            for p, urls in page_assets.items()
            if any(canonical(u) == c_url for u in urls)
        ]
        tsv_lines.append(
            f"{c_url}\t{b}\t{local}\t{','.join(pages)}"
        )

    tsv_path = SCRIPTS / "webflow-asset-manifest.tsv"
    tsv_path.write_text("\n".join(tsv_lines) + "\n", encoding="utf-8")

    print(f"routes: {len(page_assets)} ok, {len(errors)} errors")
    print(f"unique assets: {len(unique)}")
    print(f"canonical: {len(canon_groups)}")
    print(f"wrote {inv_path}")
    print(f"wrote {tsv_path}")


if __name__ == "__main__":
    main()

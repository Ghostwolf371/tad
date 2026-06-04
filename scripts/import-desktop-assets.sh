#!/usr/bin/env bash
# Copy manually downloaded Webflow assets from Desktop into public/.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE="${TAD_ASSETS_SOURCE:-/Users/ghost/Desktop/TAD-assets}"
PUBLIC="$ROOT/public"

if [[ ! -d "$SOURCE" ]]; then
  echo "error: source not found: $SOURCE" >&2
  exit 1
fi

exec python3 - "$SOURCE" "$PUBLIC" <<'PY'
from __future__ import annotations

import shutil
import sys
import urllib.parse
from pathlib import Path

SOURCE = Path(sys.argv[1])
PUBLIC = Path(sys.argv[2])

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

CLIENT_MAP: dict[str, str] = {
    "client-heineken-logo.png": "clients/heineken.png",
    "client-parbo-logo.png": "clients/parbo.png",
    "client-telesur-logo.png": "clients/telesur.png",
    "client-kings-logo.png": "clients/kings.png",
    "client-smart-logo.png": "clients/smart-connexxionz.png",
    "client-fernandes-logo.png": "clients/fernandes.png",
    "client-tba-logo.png": "clients/trustbank-amanah.png",
    "client-chuck-logo.png": "clients/chuck-e-cheese.png",
    "client-allstar-logo.png": "clients/all-star.png",
    "client-dw-logo.png": "clients/digital-world.png",
    "client-maze-logo.png": "clients/maze.png",
    "client-queens-logo.png": "clients/queens.png",
}

# Structured extras (suffix substring -> dest); first match wins
EXTRA_MAP: list[tuple[str, str]] = [
    ("contact.jpg", "contact/contact-hero.jpg"),
    ("bg (4).webp", "about/about-hero-bg.webp"),
    ("blog1.jpg", "blog/blog-1.jpg"),
    ("blog2.jpg", "blog/blog-2.jpg"),
    ("blog3.jpg", "blog/blog-3.jpg"),
    ("TAD_gif-poster-00001.jpg", "brand/tad-gif-poster.jpg"),
    ("TAD-assets1.png", "about/tad-assets-alt.png"),
]


def decode_name(raw: str) -> str:
    return urllib.parse.unquote(raw)


def tail_name(decoded: str) -> str:
    if "/" in decoded:
        return decoded.split("/", 1)[-1]
    if "_" in decoded:
        return decoded.split("_", 1)[-1]
    return decoded


def resolve_dest(decoded: str) -> str | None:
    tail = tail_name(decoded)
    for suffix, dest in LOCAL_MAP.items():
        if decoded.endswith(suffix) or tail == suffix:
            return dest
    for key, dest in CLIENT_MAP.items():
        if key in decoded:
            return dest
    for key, dest in EXTRA_MAP:
        if key in decoded or tail == key:
            return dest
    return None


def safe_unused_name(decoded: str) -> str:
    tail = tail_name(decoded)
    return tail.replace("/", "-").replace(" ", "-")


# dest -> (size, path)
tier1: dict[str, tuple[int, Path]] = {}
extras: dict[str, tuple[int, Path]] = {}
unmapped: dict[str, tuple[int, Path]] = {}

for path in SOURCE.rglob("*"):
    if not path.is_file() or path.name == ".DS_Store":
        continue
    decoded = decode_name(path.name)
    dest_rel = resolve_dest(decoded)
    size = path.stat().st_size
    if dest_rel:
        bucket = tier1 if dest_rel in LOCAL_MAP.values() or dest_rel in CLIENT_MAP.values() else extras
        prev = bucket.get(dest_rel)
        if prev is None or size > prev[0]:
            bucket[dest_rel] = (size, path)
    else:
        prev = unmapped.get(decoded)
        if prev is None or size > prev[0]:
            unmapped[decoded] = (size, path)

replaced = 0
imported_extra = 0
imported_unused = 0

for dest_rel, (_, src) in sorted(tier1.items()):
    dest = PUBLIC / dest_rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dest)
    print(f"replace  public/{dest_rel}  <-  {src}")
    replaced += 1

for dest_rel, (_, src) in sorted(extras.items()):
    dest = PUBLIC / dest_rel
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dest)
    print(f"extra    public/{dest_rel}  <-  {src}")
    imported_extra += 1

unused_dir = PUBLIC / "assets" / "unused"
for decoded, (_, src) in sorted(unmapped.items()):
    dest = unused_dir / safe_unused_name(decoded)
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dest)
    print(f"unused   public/assets/unused/{dest.name}  <-  {src}")
    imported_unused += 1

print()
print(f"done: {replaced} replaced, {imported_extra} extras, {imported_unused} unused")
PY

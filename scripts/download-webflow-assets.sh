#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PUBLIC="$ROOT/public"
CDN="https://cdn.prod.website-files.com"

download() {
  local url="$1"
  local dest="$2"
  mkdir -p "$(dirname "$dest")"
  if [[ -f "$dest" ]]; then
    echo "skip $dest"
    return
  fi
  echo "get $dest"
  curl -fsSL "$url" -o "$dest"
}

# Brand
download "$CDN/67547d896ca857205d0d89a6/67a618d62ed82c9507467c2c_Logomark.png" "$PUBLIC/brand/logomark.png"
download "$CDN/67547d896ca857205d0d89a6/677d26a77ac1faf5b8ec449f_TAD-Logo-OriginalWit.png" "$PUBLIC/brand/logo-white.png"

# Team (about-two)
download "$CDN/67547d896ca857205d0d8a25/67547d896ca857205d0d8c77_Team%20Member%201.webp" "$PUBLIC/team/member-1.webp"
download "$CDN/67547d896ca857205d0d8a25/67547d896ca857205d0d8c5a_Team%20Member%202.webp" "$PUBLIC/team/member-2.webp"
download "$CDN/67547d896ca857205d0d8a25/67547d896ca857205d0d8c45_Team%20Member%203.webp" "$PUBLIC/team/member-3.webp"
download "$CDN/67547d896ca857205d0d8a25/67547d896ca857205d0d8c2d_Team%20Member%204.webp" "$PUBLIC/team/member-4.webp"
download "$CDN/67547d896ca857205d0d89a6/6790fe4dc464d8dcbfd95ad7_tad-group-1.png.jpeg" "$PUBLIC/team/group-1.jpeg"
download "$CDN/67547d896ca857205d0d89a6/67910146cc6ce3fcb56fea3d_tad-group-2.png.jpeg" "$PUBLIC/team/group-2.jpeg"
download "$CDN/67547d896ca857205d0d89a6/679101943f8dba921d32d2f7_tad-group-3.png.jpeg" "$PUBLIC/team/group-3.jpeg"

# Services
download "$CDN/67547d896ca857205d0d89a6/677d41abffb0c0b61fc5d9cb_service-1.png" "$PUBLIC/services/web-development.png"
download "$CDN/67547d896ca857205d0d89a6/677d466340808a208a402c87_mobile.png" "$PUBLIC/services/mobile-development.png"
download "$CDN/67547d896ca857205d0d89a6/677d46f097e85ea0e17be854_marketing.png" "$PUBLIC/services/digital-marketing.png"
download "$CDN/67547d896ca857205d0d89a6/677d47664a2d3faad8e7b897_e-commerce.png" "$PUBLIC/services/e-commerce.png"
download "$CDN/67547d896ca857205d0d89a6/679260f65ee92f1146139812_services.png" "$PUBLIC/services/services-hero.png"

# Client logos
download "$CDN/67547d896ca857205d0d89a6/6790ef7d311bae62dc203831_client-heineken-logo.png" "$PUBLIC/clients/heineken.png"
download "$CDN/67547d896ca857205d0d89a6/6790f13b2570f981ef59fbb3_client-parbo-logo.png" "$PUBLIC/clients/parbo.png"
download "$CDN/67547d896ca857205d0d89a6/6790f0bf669eda42c260fae2_client-telesur-logo.png" "$PUBLIC/clients/telesur.png"
download "$CDN/67547d896ca857205d0d89a6/6790f0ed0450956b75c3799c_client-kings-logo.png" "$PUBLIC/clients/kings.png"
download "$CDN/67547d896ca857205d0d89a6/6790ee24bc9d6f8c16738951_client-smart-logo.png" "$PUBLIC/clients/smart-connexxionz.png"
download "$CDN/67547d896ca857205d0d89a6/6790f17570b40fd80ee474b8_client-fernandes-logo.png" "$PUBLIC/clients/fernandes.png"
download "$CDN/67547d896ca857205d0d89a6/6790f1a434c6aa07553c9f80_client-tba-logo.png" "$PUBLIC/clients/trustbank-amanah.png"
download "$CDN/67547d896ca857205d0d89a6/6790f1db963d8d9bdbfefe4c_client-chuck-logo.png" "$PUBLIC/clients/chuck-e-cheese.png"
download "$CDN/67547d896ca857205d0d89a6/6790f237e0b183d46e41be6a_client-allstar-logo.png" "$PUBLIC/clients/all-star.png"
download "$CDN/67547d896ca857205d0d89a6/6790f2600ad4201c8445e73e_client-dw-logo.png" "$PUBLIC/clients/digital-world.png"
download "$CDN/67547d896ca857205d0d89a6/6790f2949b87ad14d87d8eaa_client-maze-logo.png" "$PUBLIC/clients/maze.png"
download "$CDN/67547d896ca857205d0d89a6/6790f3d8b7d0644536cbec87_client-queens-logo.png" "$PUBLIC/clients/queens.png"

# Portfolio / case study visuals
download "$CDN/67547d896ca857205d0d8a25/67a64b07bcfa62c57070cb94_kings.jpg" "$PUBLIC/projects/screenshots/kings-enterprises.jpg"
download "$CDN/67547d896ca857205d0d8a25/677d2a0f46899a7c32728879_Smart_Connexxionz_concept_1.jpg" "$PUBLIC/projects/screenshots/smart-connexxionz.jpg"
download "$CDN/67547d896ca857205d0d8a25/677d2a6ac7548dc2dea9cca9_Kings_Enterprises_NV_concept_1.jpg" "$PUBLIC/projects/screenshots/kings-enterprises-concept.jpg"
download "$CDN/67547d896ca857205d0d8a25/677c18f985acdeceabbb7149_smartc.jpg" "$PUBLIC/projects/screenshots/smart-connexxionz-thumb.jpg"
download "$CDN/67547d896ca857205d0d8a25/677d27ffc7548dc2dea73ea4_Coffee_Box_concept_1.jpg" "$PUBLIC/projects/screenshots/the-coffee-box.jpg"
download "$CDN/67547d896ca857205d0d8a25/677d2ac5f25a45b165cf3361_Devinas_Enterprises.jpg" "$PUBLIC/projects/screenshots/devinas-enterprises.jpg"
download "$CDN/67547d896ca857205d0d89a6/67547d896ca857205d0d8c94_Hotel.webp" "$PUBLIC/projects/screenshots/queens-hotel.webp"
# Optional gallery extras (CDN may 403; screenshots used as fallback in data)
download "$CDN/67547d896ca857205d0d89a6/67547d896ca857205d0d8a28_Portfolio%202.webp" "$PUBLIC/projects/gallery/the-coffee-box-2.webp" || echo "warn: Portfolio 2.webp unavailable"
download "$CDN/67547d896ca857205d0d89a6/67547d896ca857205d0d8aec_Portfolio%208.webp" "$PUBLIC/projects/gallery/devinas-enterprises-8.webp" || echo "warn: Portfolio 8.webp unavailable"

# Reviews
download "$CDN/67547d896ca857205d0d89a6/67547d896ca857205d0d8a71_Review%201.avif" "$PUBLIC/reviews/review-1.avif"
download "$CDN/67547d896ca857205d0d89a6/67547d896ca857205d0d8a72_Review%202.avif" "$PUBLIC/reviews/review-2.avif"
download "$CDN/67547d896ca857205d0d89a6/67547d896ca857205d0d8a73_Review%203.avif" "$PUBLIC/reviews/review-3.avif"
download "$CDN/67547d896ca857205d0d89a6/67547d896ca857205d0d8a08_Client%201.webp" "$PUBLIC/reviews/client-1.webp"
download "$CDN/67547d896ca857205d0d89a6/67547d896ca857205d0d8a09_Client%202.webp" "$PUBLIC/reviews/client-2.webp"
download "$CDN/67547d896ca857205d0d89a6/67547d896ca857205d0d8a0a_Client%203.webp" "$PUBLIC/reviews/client-3.webp"
download "$CDN/67547d896ca857205d0d89a6/67547d896ca857205d0d8a05_Client%204.webp" "$PUBLIC/reviews/client-4.webp"

# About / marketing
download "$CDN/67547d896ca857205d0d89a6/67547d896ca857205d0d8c79_Business%20Goal%20Image%20One.webp" "$PUBLIC/about/business-goal-one.webp"
download "$CDN/67547d896ca857205d0d89a6/67547d896ca857205d0d8c78_Business%20Goal%20Image%20Two.webp" "$PUBLIC/about/business-goal-two.webp"
download "$CDN/67547d896ca857205d0d89a6/67547d896ca857205d0d8c6b_Business%20Goal%20Image%20Three.webp" "$PUBLIC/about/business-goal-three.webp"
download "$CDN/67547d896ca857205d0d89a6/677d1f2a2cc087c27a98ce59_TAD-assets.png" "$PUBLIC/about/tad-assets.png"
download "$CDN/67547d896ca857205d0d89a6/678536301f4b20ad2f066377_about.jpg" "$PUBLIC/about/about-hero.jpg"

# Careers
download "$CDN/67547d896ca857205d0d89a6/67925a0db9df1b47d9bc770d_career.jpg" "$PUBLIC/careers/career.jpg"

# Contact / book
download "$CDN/67547d896ca857205d0d89a6/67547d896ca857205d0d8b68_Get%20in%20touch%20contact.webp" "$PUBLIC/contact/get-in-touch.webp"
download "$CDN/67547d896ca857205d0d89a6/67547d896ca857205d0d8b6d_Contact%20Two%20CTA.avif" "$PUBLIC/contact/book-cta.avif"

echo "done"

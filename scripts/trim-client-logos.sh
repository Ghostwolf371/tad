#!/usr/bin/env bash
# Trim matte padding and remove black backgrounds from Webflow client logo PNGs.
set -euo pipefail
DIR="$(cd "$(dirname "$0")/.." && pwd)/public/clients"
cd "$DIR"
for f in *.png; do
  [[ -f "$f" ]] || continue
  magick "$f" -fuzz 12% -trim +repage -fuzz 14% -transparent "#000000" "$f"
  echo "trimmed $f $(magick identify -format '%wx%h' "$f")"
done

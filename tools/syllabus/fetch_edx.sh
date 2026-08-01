#!/bin/bash
# fetch_edx.sh <landing-url> <out-name> <as|alevel|plain>
# Pearson publishes separate AS and A Level specification PDFs from the same
# landing page, so the AS/A split does not have to be inferred.
set -uo pipefail
D="$(dirname "$0")/edx"; mkdir -p "$D"
URL="$1"; OUT="$2"; WANT="${3:-plain}"
[ -s "$D/$OUT.pdf" ] && { echo "CACHED $OUT"; exit 0; }
H=$(curl -sL --max-time 45 -A "Mozilla/5.0" "$URL")
[ -z "$H" ] && { echo "NOPAGE $OUT"; exit 1; }
LINKS=$(printf '%s' "$H" | grep -oiE 'href="[^"]*specification[^"]*\.pdf"' | sed 's/^href="//;s/"$//' | sort -u)
[ -z "$LINKS" ] && { echo "NOPDF  $OUT"; exit 1; }
case "$WANT" in
  as)     P=$(printf '%s\n' "$LINKS" | grep -iE '_as_|-as-|as-spec' | head -1) ;;
  alevel) P=$(printf '%s\n' "$LINKS" | grep -viE '_as_|-as-|as-spec' | head -1) ;;
  *)      P=$(printf '%s\n' "$LINKS" | head -1) ;;
esac
[ -z "$P" ] && { echo "NOMATCH $OUT ($WANT)"; exit 1; }
ENC=$(printf '%s' "$P" | sed 's/ /%20/g')
curl -sL --max-time 90 -A "Mozilla/5.0" "https://qualifications.pearson.com${ENC}" -o "$D/$OUT.pdf"
if head -c4 "$D/$OUT.pdf" 2>/dev/null | grep -q PDF; then
  echo "https://qualifications.pearson.com${ENC}" > "$D/$OUT.src"; echo "OK     $OUT"
else echo "BAD    $OUT"; rm -f "$D/$OUT.pdf"; exit 1; fi

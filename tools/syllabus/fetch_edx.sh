#!/bin/bash
# fetch_edx.sh <landing-url> <out-name> <as|alevel|plain>
# ONLY=<regex> narrows which specification link to take when a landing page
# hosts more than one qualification.
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
# The AS file is identified by its basename, not by the whole path: Pearson
# names it "as-l3-mathematics-specification.pdf", and a pattern anchored on a
# leading dash ("-as-") never matched a name that simply starts with "as-".
# That silently fell through to NOMATCH for Mathematics, Chemistry, Economics
# and History.
#
# A landing page can also carry a sibling qualification — the Mathematics page
# hosts both Mathematics and Further Mathematics — so when a filename filter is
# given, it selects among the links first.
AS_RE='(^|/)as[-_]|[-_]as[-_]'
case "$WANT" in
  as)     P=$(printf '%s\n' "$LINKS" | grep -iE "$AS_RE" | grep -iE "${ONLY:-.}" | head -1) ;;
  alevel) P=$(printf '%s\n' "$LINKS" | grep -viE "$AS_RE" | grep -iE "${ONLY:-.}" | head -1) ;;
  *)      P=$(printf '%s\n' "$LINKS" | grep -iE "${ONLY:-.}" | head -1) ;;
esac
[ -z "$P" ] && { echo "NOMATCH $OUT ($WANT)"; exit 1; }
ENC=$(printf '%s' "$P" | sed 's/ /%20/g')
curl -sL --max-time 90 -A "Mozilla/5.0" "https://qualifications.pearson.com${ENC}" -o "$D/$OUT.pdf"
if head -c4 "$D/$OUT.pdf" 2>/dev/null | grep -q PDF; then
  echo "https://qualifications.pearson.com${ENC}" > "$D/$OUT.src"; echo "OK     $OUT"
else echo "BAD    $OUT"; rm -f "$D/$OUT.pdf"; exit 1; fi

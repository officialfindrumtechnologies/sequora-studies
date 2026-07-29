#!/bin/bash
# fetch_cie.sh <slug-prefix> <subject-slug> <code> [target-exam-year]
# Picks the syllabus version whose exam-year range covers the next sitting,
# NOT simply the newest — Cambridge publishes future specs years ahead
# (9700 currently offers both 2025-2027 and 2028-2030).
set -uo pipefail
D="$(dirname "$0")"; mkdir -p "$D/pdf"
PFX="$1"; SUBJ="$2"; CODE="$3"; TY="${4:-2027}"
OUT="$D/pdf/${PFX}-${SUBJ}-${CODE}.pdf"
META="$D/pdf/${PFX}-${SUBJ}-${CODE}.src"
[ -s "$OUT" ] && { echo "CACHED $CODE $(cat "$META" 2>/dev/null)"; exit 0; }
URL="https://www.cambridgeinternational.org/programmes-and-qualifications/${PFX}-${SUBJ}-${CODE}/"
H=$(curl -sL --max-time 30 -A "Mozilla/5.0" "$URL")
[ -z "$H" ] && { echo "NOPAGE $PFX $SUBJ $CODE"; exit 1; }
CAND=$(printf '%s' "$H" | grep -oE '/Images/[0-9]+-20[0-9]{2}-20[0-9]{2}-syllabus\.pdf' | sort -u)
[ -z "$CAND" ] && { echo "NOPDF  $PFX $SUBJ $CODE"; exit 1; }
P=$(printf '%s\n' "$CAND" | awk -v ty="$TY" -F'-' '
  { for(i=1;i<=NF;i++) if($i ~ /^20[0-9][0-9]$/){a=$i; b=$(i+1); break}
    if(ty>=a && ty<=b) print "0 " a " " $0; else print "1 " a " " $0 }' \
  | sort -k1,1n -k2,2rn | head -1 | cut -d' ' -f3)
curl -sL --max-time 60 -A "Mozilla/5.0" "https://www.cambridgeinternational.org${P}" -o "$OUT"
if [ -s "$OUT" ] && head -c4 "$OUT" | grep -q PDF; then
  echo "https://www.cambridgeinternational.org${P}" > "$META"
  echo "OK     $CODE $P"
else echo "BAD    $PFX $SUBJ $CODE"; rm -f "$OUT"; exit 1; fi

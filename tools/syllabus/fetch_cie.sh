#!/bin/bash
# fetch_cie.sh <slug-prefix> <subject-slug> <code> [target-exam-year]
# Picks the syllabus version whose exam-year range covers the next sitting,
# NOT simply the newest — Cambridge publishes future specs years ahead
# (9700 currently offers both 2025-2027 and 2028-2030).
#
# Cambridge names a syllabus either for a range ("-2027-2029-syllabus.pdf") or
# for a single year ("-2027-syllabus.pdf") when a subject is mid-transition.
# Matching only the range form made the single-year files invisible: 9990 has a
# 2027 syllabus, and ignoring it left the 2028-2030 spec as the closest
# candidate — a syllabus for exams two years after the one being planned for.
set -uo pipefail
D="$(dirname "$0")"; mkdir -p "$D/pdf"
PFX="$1"; SUBJ="$2"; CODE="$3"; TY="${4:-2027}"
OUT="$D/pdf/${PFX}-${SUBJ}-${CODE}.pdf"
META="$D/pdf/${PFX}-${SUBJ}-${CODE}.src"
[ -s "$OUT" ] && { echo "CACHED $CODE $(cat "$META" 2>/dev/null)"; exit 0; }
URL="https://www.cambridgeinternational.org/programmes-and-qualifications/${PFX}-${SUBJ}-${CODE}/"
H=$(curl -sL --max-time 30 -A "Mozilla/5.0" "$URL")
[ -z "$H" ] && { echo "NOPAGE $PFX $SUBJ $CODE"; exit 1; }

# "-syllabus-update.pdf" is an addendum listing what changed, not the syllabus.
CAND=$(printf '%s' "$H" \
  | grep -oiE '/images/[0-9]+-20[0-9]{2}(-20[0-9]{2})?-syllabus\.pdf' | sort -u)
[ -z "$CAND" ] && { echo "NOPDF  $PFX $SUBJ $CODE"; exit 1; }

# Rank: 0 covers the target year, 1 does not. Within a rank prefer the later
# start year, so a miss falls back to the closest forward spec rather than an
# expired one.
P=$(printf '%s\n' "$CAND" | awk -v ty="$TY" '
  { n=split($0, f, "-"); a=""; b=""
    for (i = 1; i <= n; i++) if (f[i] ~ /^20[0-9][0-9]$/) { if (a == "") a = f[i]; else b = f[i] }
    if (b == "") b = a
    if (ty >= a && ty <= b) print "0 " a " " $0; else print "1 " a " " $0 }' \
  | sort -k1,1n -k2,2rn | head -1)
RANK=${P%% *}; P=${P##* }
curl -sL --max-time 60 -A "Mozilla/5.0" "https://www.cambridgeinternational.org${P}" -o "$OUT"
if [ -s "$OUT" ] && head -c4 "$OUT" | grep -q PDF; then
  echo "https://www.cambridgeinternational.org${P}" > "$META"
  # A rank-1 pick is reported, not silently accepted: it means no published
  # syllabus covers the sitting being planned for, which a human must judge.
  [ "$RANK" = 0 ] && echo "OK     $CODE $P" || echo "NOCOVER $CODE $P (none covers $TY)"
else echo "BAD    $PFX $SUBJ $CODE"; rm -f "$OUT"; exit 1; fi

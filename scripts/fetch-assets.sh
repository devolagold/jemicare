#!/usr/bin/env bash
# Downloads every Figma asset used by the app into ./public/assets (run from project root).
# Figma's asset URLs are temporary (~7 days). If they expire, re-run get_design_context to refresh the prefixes.
set -e
ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
mkdir -p "$ROOT_DIR/public/assets" && cd "$ROOT_DIR/public/assets"
B=https://www.figma.com/api/mcp/asset
get(){ curl -fsSL "$B/$1/$2" -o "$3" && echo "ok $3"; }
H=163ecb9f-89f5-4145-b2d0-1176cc140a29
get $H c1384.png logo.png; get $H 07db7.svg arrow-badge.svg; get $H 6a261.png hero-bg.png
get $H f4444.png hero-top.png; get $H b8a72.png hero-bottom.png; get $H 44b49.png hero-left.png; get $H fdb05.png hero-right.png
get $H 16e00.svg arrow-dark.svg
I=30192924-347d-48c3-83c3-ff7f20d3dbb2
get $I 48dce.png intro-1.png; get $I 6d517.png intro-2.png; get $I f071f.png intro-3.png
G=4cc6f89e-b5c6-4b71-93f7-e80753f4de9d
get $G b5fae.png involve-photo.png; get $G a5ea8.svg eyebrow-a.svg; get $G 511c9.svg eyebrow-b.svg
get $G 242a0.svg arrow-light.svg; get $G ac5e0.svg involve-card.svg
L=15820ca5-eba4-4603-8b90-0cf1e8e27ad4
get $L b0a35.png founder.png; get $L f2eab.png avatar-2.png; get $L a7583.png avatar-3.png
T=48948b1b-af46-445d-b2ab-0e38a105b247
get $T 2568a.png fund-chart.png; get $T 73052.svg ic-commit.svg; get $T c861f.svg ic-resources.svg
get $T 51f29.svg ic-monitor.svg; get $T 74072.svg ic-download.svg
P=5f85b61f-0d10-45aa-8095-3f42d78ba8f3
get $P eaaa0.svg eyebrow-a-w.svg; get $P 44df3.svg eyebrow-b-w.svg
get d0bb3884-48b5-43a4-b89b-bef11e136bb5 49496.svg tl-divider.svg
S=2dccd755-73b2-435e-93c9-7784bbb06d2b
get $S c9aa7.png story-1.png; get $S fd6dd.png story-2.png; get $S b74eb.png story-3.png; get $S f8919.png story-4.png; get $S 6f49f.svg play.svg
F=6aa96229-9ca7-4560-a882-6f3a9c04c812
get $F 64315.svg add.svg; get $F 9fa92.svg subtract.svg
C=98b7f3ee-4938-403e-971c-b538886d9745
get $C d8454.png cta-1.png; get $C 29d18.png cta-2.png; get $C 32d73.svg cta-lines.svg
O=2bf33453-d040-47af-8f5c-997aaba80e5e
get $O 7cb3c.svg so-linkedin.svg; get $O 995e8.svg so-twitter.svg; get $O 3413a.svg so-facebook.svg; get $O b57fc.svg so-youtube.svg

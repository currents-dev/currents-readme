#!/usr/bin/env bash
# Convert a captured WebM into a docs-ready asset.
#
#   media.sh mp4 out/clip.webm [start] [duration]
#   media.sh gif out/clip.webm [start] [duration] [width]
#
# GitBook embeds both via the normal figure/img syntax. Prefer mp4: a 10s clip
# is ~10x smaller than the equivalent gif. Use gif only for very short loops
# (<4s) where autoplay-without-controls matters.
set -euo pipefail

mode=${1:?usage: media.sh mp4|gif <file.webm> [start] [duration] [width]}
src=${2:?missing input .webm}
start=${3:-0}
dur=${4:-}
width=${5:-1200}
out="${src%.webm}.${mode}"

trim=(-ss "$start")
[[ -n "$dur" ]] && trim+=(-t "$dur")

case "$mode" in
  mp4)
    # yuv420p + even dimensions: required for Safari/QuickTime playback.
    ffmpeg -loglevel error -y "${trim[@]}" -i "$src" \
      -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" \
      -c:v libx264 -crf 23 -pix_fmt yuv420p -movflags +faststart -an "$out"
    ;;
  gif)
    # Two-pass palette; a single pass produces visible banding on UI gradients.
    ffmpeg -loglevel error -y "${trim[@]}" -i "$src" \
      -vf "fps=12,scale=${width}:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=192[p];[b][p]paletteuse=dither=bayer:bayer_scale=3" \
      -loop 0 "$out"
    ;;
  *) echo "unknown mode: $mode (expected mp4 or gif)" >&2; exit 2 ;;
esac

printf '%s  %s\n' "$(du -h "$out" | cut -f1)" "$out"

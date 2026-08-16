# Museum of Detectors — Handoff

## What exists now

The museum scroll-world is live and integrated into the main Angular app at `localhost:4201/` (served by `ng serve`). The museum is the full-page hero; scrolling past it reveals the Compression Demo, Results Tables, and References sections.

All 11 clips (6 dives + 5 connectors) are AI-generated via Kling and fully photoreal end-to-end — no placeholders remain.

### Key files

| File | Purpose |
|---|---|
| `src/index.html` | Angular app entry — embeds the museum world before `<app-root>` |
| `public/scrub-engine.js` | Scroll-world engine (shared) |
| `public/museum/index.html` | Standalone museum page at `/museum/` (still works independently) |
| `public/museum/img/still_0–5.jpg` | 6 scene stills (PIL-generated, abstract — used only as poster/loading fallback, NOT as Kling generation input, see bug below) |
| `public/museum/vid/dive_0–5.mp4` | AI-generated dive clips (Kling, re-encoded) |
| `public/museum/vid/conn_0–4.mp4` | AI-generated connector clips (Kling, re-encoded) |

---

## Bug history: abstract-icon opening (fixed 2026-08-15)

**Symptom:** every dive clip opened with ~2–4s of an abstract dark icon/glyph graphic (chandelier bulbs on pedestals, diamond shapes, bar-chart blocks) before "revealing" the photoreal clay-diorama interior. Connectors, built to seam-match each dive's real first frame pixel-for-pixel, inherited the same abstract ending. Every transition in the scroll-world dipped into a flat abstract graphic between the museum-interior beats.

**Root cause:** the original dive generations used `still_N.jpg` (PIL-generated abstract data-viz posters) as the Kling start frame. Kling faithfully animated a "reveal" from that abstract starting image into a photoreal room, so every dive spent 40–75% of its 5s runtime on the abstract opening.

**Fix:** regenerated all 6 dives using each dive's own *existing photoreal last frame* as the new start frame, with a prompt describing a simple continuous glide through the already-resolved room (no "reveal" language). Then regenerated all 5 connectors from fresh seam frames extracted off the new, fully-photoreal dives. Verified via frame-by-frame timeline export (`fps=4,tile=20x1`) that every dive is architecture-only from frame 1.

**Takeaway for any future re-roll:** never use `still_N.jpg` as a Kling start frame for a dive. Always extract a real interior frame from an existing good dive (or a fresh screenshot of the desired end state) as the start frame instead.

---

## Re-roll procedure (if a clip needs regenerating)

### Regenerating a dive

1. Extract a photoreal frame to use as start (e.g. the current dive's own last frame, or any clean interior shot of that room):
   ```bash
   ffmpeg -sseof -0.15 -i public/museum/vid/dive_N.mp4 -vframes 1 /tmp/dive_N_start.jpg
   ```
2. On `https://kling.ai/app/video/new`: upload as **Start Frame** only (no end frame). Set **720p, 5s, Native Audio OFF**.
3. Prompt template (swap in the room name and a couple of matching nouns):
   ```
   Single continuous cinematic camera move, no cuts. The camera glides slowly forward through the <ROOM NAME>, drifting past the <notable furnishings> toward the <archway/doorway/etc> ahead. Clay diorama natural history museum wing, isometric tilt-shift miniature, warm limestone halls, amber chandeliers, deep mahogany palette. Smooth graceful slow motion, subtle parallax. No text, no captions.
   ```
4. Download, re-encode:
   ```bash
   ffmpeg -i ~/Downloads/<kling_filename>.mp4 -an -g 8 -crf 20 -movflags +faststart -y public/museum/vid/dive_N.mp4
   ```
5. Re-extract seam frames for the connectors on either side of this dive (see below) and regenerate those connectors too — their seams now point at stale frames.

### Regenerating a connector

1. Extract fresh seam frames from the (now-photoreal) adjacent dives:
   ```bash
   ffmpeg -sseof -0.15 -i public/museum/vid/dive_i.mp4 -vframes 1 /tmp/last_i.jpg      # start frame
   ffmpeg -i public/museum/vid/dive_{i+1}.mp4 -vframes 1 /tmp/first_{i+1}.jpg           # end frame
   ```
2. On `https://kling.ai/app/video/new`: upload `last_i.jpg` as **Start Frame**, `first_{i+1}.jpg` as **End Frame** ("Add an end frame"). Set **720p, 5s, Native Audio OFF** (the resolution/audio toggle sometimes resets to 1080p/audio-on when the form is reset — double check before generating, cost should read 30 credits, not 60).
3. Prompt template:
   ```
   Single continuous cinematic camera move, no cuts. The camera smoothly pulls up and back out of the <ROOM A>, rising into the sky above the miniature museum complex, then glides forward across the connected miniature world and arrives above the <ROOM B>, beginning to descend toward it. One connected miniature clay world, seamless flowing aerial transition. Clay diorama natural history museum, isometric tilt-shift miniature, warm limestone halls, amber chandeliers, deep mahogany palette. Smooth graceful slow motion. No text, no captions.
   ```
4. Download, re-encode:
   ```bash
   ffmpeg -i ~/Downloads/<kling_filename>.mp4 -an -g 8 -crf 20 -movflags +faststart -y public/museum/vid/conn_N.mp4
   ```

### Serving local images to Kling for upload

The claude-in-chrome MCP `upload_image` tool needs an `imageId` from a prior screenshot, not a raw file path. Serve the `/tmp` seam frames over HTTP and screenshot them in a scratch browser tab to get an imageId:
```bash
cd /tmp && python3 -m http.server 4202 &
```
Then navigate to `http://localhost:4202/<file>.jpg`, screenshot it, and pass the resulting screenshot ID to `upload_image`. Kill the server (`lsof -ti:4202 | xargs kill`) when done.

### Verifying seams

Build a contact sheet instead of eyeballing playback — much faster to spot a mismatch:
```bash
ffmpeg -i dive_N_LAST.jpg -i conn_N_FIRST.jpg -i conn_N_LAST.jpg -i dive_N+1_FIRST.jpg \
  -filter_complex "[0:v]scale=300:200[a];[1:v]scale=300:200[b];[2:v]scale=300:200[c];[3:v]scale=300:200[d];[a][b][c][d]hstack=4" \
  seam_check.jpg
```
Good seam: columns 1↔2 and 3↔4 look near-identical (dive-end matches connector-start; connector-end matches next-dive-start).

Also worth a per-clip timeline sanity check after any regeneration, to catch a clip drifting off-style mid-shot:
```bash
ffmpeg -i dive_N.mp4 -vf "fps=4,scale=200:-1,tile=20x1" dive_N_timeline.jpg
```

---

## Current asset status

| Clip | Status | Notes |
|---|---|---|
| `dive_0.mp4` | ✅ AI (Kling) | Grand Entrance — regenerated, photoreal throughout |
| `dive_1.mp4` | ✅ AI (Kling) | Hall of Giants — regenerated, photoreal throughout |
| `dive_2.mp4` | ✅ AI (Kling) | Efficiency Era — regenerated, photoreal throughout |
| `dive_3.mp4` | ✅ AI (Kling) | STRIDE Lab — regenerated, photoreal throughout |
| `dive_4.mp4` | ✅ AI (Kling) | Results Gallery — regenerated, photoreal throughout |
| `dive_5.mp4` | ✅ AI (Kling) | Reading Room — regenerated, photoreal throughout |
| `conn_0.mp4` | ✅ AI (Kling) | Grand Entrance → Hall of Giants — regenerated against new seams |
| `conn_1.mp4` | ✅ AI (Kling) | Hall of Giants → Efficiency Era — regenerated against new seams |
| `conn_2.mp4` | ✅ AI (Kling) | Efficiency Era → STRIDE Lab — regenerated against new seams |
| `conn_3.mp4` | ✅ AI (Kling) | STRIDE Lab → Results Gallery — regenerated against new seams |
| `conn_4.mp4` | ✅ AI (Kling) | Results Gallery → Reading Room — regenerated against new seams |
| `still_0–5.jpg` | ✅ Done | PIL-generated abstract posters — used as loading/poster fallback only, never as a Kling input |

**Known cosmetic issue (not yet fixed):** all Kling clips carry a small "KlingAI 3.0" watermark burned into the bottom-right corner. Not currently addressed.

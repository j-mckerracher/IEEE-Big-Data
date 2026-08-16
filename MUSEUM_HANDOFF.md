# Museum of Detectors — Handoff

## What exists now

The museum scroll-world is live and integrated into the main Angular app at `localhost:4201/` (served by `ng serve`). The museum is the full-page hero; scrolling past it reveals the Compression Demo, Results Tables, and References sections.

### Key files

| File | Purpose |
|---|---|
| `src/index.html` | Angular app entry — embeds the museum world before `<app-root>` |
| `public/scrub-engine.js` | Scroll-world engine (shared) |
| `public/museum/index.html` | Standalone museum page at `/museum/` (still works independently) |
| `public/museum/img/still_0–5.jpg` | 6 scene stills (PIL-generated, 1536×1024) |
| `public/museum/vid/dive_0.mp4` | **AI-generated** Grand Entrance dive (Kling, re-encoded) |
| `public/museum/vid/dive_1–5.mp4` | **Placeholder** ffmpeg zoompan clips (8s each) |
| `public/museum/vid/conn_0–4.mp4` | **Placeholder** ffmpeg xfade connector clips (5s each) |

---

## What still needs to be done

### 1. Top up Kling credits

You need **~300 more credits** (you have 36). The full remaining chain is:

- 5 dive clips (dives 1–5) × 30 credits = 150
- 5 connector clips (conn 0–4) × 30 credits = 150
- **Total: 300 credits** — top up to ~336 to leave re-roll headroom

Go to: `https://kling.ai` → top-right → Buy Credits.

---

### 2. Generate dives 1–5

For each dive, go to `https://kling.ai/app/video/new`:
- Upload the corresponding still as **Start Frame**
- Set: **720p, 5s, Native Audio OFF**
- Paste the prompt below
- Click Generate (30 credits each)

#### dive_1 — Hall of Giants
**Start frame:** `public/museum/img/still_1.jpg`
```
Single continuous cinematic camera move, no cuts. Begin high and far, looking down at the whole Hall of Giants museum wing from outside. The camera slowly glides forward and descends, sweeping in toward the massive computational machinery and towering data structures inside, as if flying through the vaulted entrance. The roof and upper structure gently open to reveal the warm amber interior. Clay diorama natural history museum wing, isometric tilt-shift miniature, warm limestone halls, amber chandeliers, deep mahogany palette. Smooth graceful slow motion, subtle parallax. No text, no captions.
```

#### dive_2 — Efficiency Era
**Start frame:** `public/museum/img/still_2.jpg`
```
Single continuous cinematic camera move, no cuts. Begin high and far, looking down at the whole Efficiency Era museum exhibit from outside. The camera slowly glides forward and descends, sweeping in toward the compact precision instruments and streamlined displays inside, as if flying through the arched entrance. The roof and upper structure gently open to reveal the warm amber interior. Clay diorama natural history museum wing, isometric tilt-shift miniature, warm limestone halls, amber chandeliers, deep mahogany palette. Smooth graceful slow motion, subtle parallax. No text, no captions.
```

#### dive_3 — STRIDE Lab
**Start frame:** `public/museum/img/still_3.jpg`
```
Single continuous cinematic camera move, no cuts. Begin high and far, looking down at the whole STRIDE research laboratory from outside. The camera slowly glides forward and descends, sweeping in toward the patch-buffer workstations and core-buffer architecture diagrams inside, as if flying through the laboratory entrance. The roof and upper structure gently open to reveal the warm amber interior. Clay diorama natural history museum wing, isometric tilt-shift miniature, warm limestone halls, amber chandeliers, deep mahogany palette. Smooth graceful slow motion, subtle parallax. No text, no captions.
```

#### dive_4 — Results Gallery
**Start frame:** `public/museum/img/still_4.jpg`
```
Single continuous cinematic camera move, no cuts. Begin high and far, looking down at the whole Results Gallery museum wing from outside. The camera slowly glides forward and descends, sweeping in toward the benchmark charts and performance trophies displayed inside, as if flying through the gallery entrance. The roof and upper structure gently open to reveal the warm amber interior. Clay diorama natural history museum wing, isometric tilt-shift miniature, warm limestone halls, amber chandeliers, deep mahogany palette. Smooth graceful slow motion, subtle parallax. No text, no captions.
```

#### dive_5 — Reading Room
**Start frame:** `public/museum/img/still_5.jpg`
```
Single continuous cinematic camera move, no cuts. Begin high and far, looking down at the whole Reading Room museum wing from outside. The camera slowly glides forward and descends, sweeping in toward the warm library shelves and reading tables inside, as if flying through the reading room entrance. The roof and upper structure gently open to reveal the warm amber interior. Clay diorama natural history museum wing, isometric tilt-shift miniature, warm limestone halls, amber chandeliers, deep mahogany palette. Smooth graceful slow motion, subtle parallax. No text, no captions.
```

---

### 3. Download and re-encode each dive

After each dive generates, download it. Then re-encode for scrubbing:

```bash
ffmpeg -i ~/Downloads/<kling_filename>.mp4 \
  -an -g 8 -crf 20 -movflags +faststart \
  -y public/museum/vid/dive_N.mp4
```

Replace `dive_N` with the correct number (1–5).

---

### 4. Extract seam frames from dives

**Critical:** connector clips must start/end on the ACTUAL last/first frames of the adjacent dives. Extract these after all 6 dives are in place:

```bash
# Last frame of dive_i → first frame of connector_i
ffmpeg -sseof -0.1 -i public/museum/vid/dive_0.mp4 -frames:v 1 /tmp/last_0.jpg
ffmpeg -sseof -0.1 -i public/museum/vid/dive_1.mp4 -frames:v 1 /tmp/last_1.jpg
ffmpeg -sseof -0.1 -i public/museum/vid/dive_2.mp4 -frames:v 1 /tmp/last_2.jpg
ffmpeg -sseof -0.1 -i public/museum/vid/dive_3.mp4 -frames:v 1 /tmp/last_3.jpg
ffmpeg -sseof -0.1 -i public/museum/vid/dive_4.mp4 -frames:v 1 /tmp/last_4.jpg

# First frame of dive_{i+1} → last frame of connector_i
ffmpeg -i public/museum/vid/dive_1.mp4 -frames:v 1 /tmp/first_1.jpg
ffmpeg -i public/museum/vid/dive_2.mp4 -frames:v 1 /tmp/first_2.jpg
ffmpeg -i public/museum/vid/dive_3.mp4 -frames:v 1 /tmp/first_3.jpg
ffmpeg -i public/museum/vid/dive_4.mp4 -frames:v 1 /tmp/first_4.jpg
ffmpeg -i public/museum/vid/dive_5.mp4 -frames:v 1 /tmp/first_5.jpg
```

---

### 5. Generate connectors 0–4

For each connector, go to `https://kling.ai/app/video/new`:
- Upload `last_i.jpg` as **Start Frame**
- Upload `first_{i+1}.jpg` as **End Frame** (click "Add an end frame")
- Set: **720p, 5s, Native Audio OFF**
- Paste the prompt below

#### conn_0 (dive_0 → dive_1)
```
Single continuous cinematic camera move, no cuts. The camera smoothly pulls up and back out of the Grand Entrance museum hall, rising into the sky above the miniature museum complex, then glides forward across the connected miniature world and arrives above the Hall of Giants wing, beginning to descend toward it. One connected miniature clay world, seamless flowing aerial transition. Clay diorama natural history museum, isometric tilt-shift miniature, warm limestone halls, amber chandeliers, deep mahogany palette. Smooth graceful slow motion. No text, no captions.
```

#### conn_1 (dive_1 → dive_2)
```
Single continuous cinematic camera move, no cuts. The camera smoothly pulls up and back out of the Hall of Giants museum wing, rising into the sky above the miniature museum complex, then glides forward across the connected miniature world and arrives above the Efficiency Era exhibit, beginning to descend toward it. One connected miniature clay world, seamless flowing aerial transition. Clay diorama natural history museum, isometric tilt-shift miniature, warm limestone halls, amber chandeliers, deep mahogany palette. Smooth graceful slow motion. No text, no captions.
```

#### conn_2 (dive_2 → dive_3)
```
Single continuous cinematic camera move, no cuts. The camera smoothly pulls up and back out of the Efficiency Era museum exhibit, rising into the sky above the miniature museum complex, then glides forward across the connected miniature world and arrives above the STRIDE research laboratory, beginning to descend toward it. One connected miniature clay world, seamless flowing aerial transition. Clay diorama natural history museum, isometric tilt-shift miniature, warm limestone halls, amber chandeliers, deep mahogany palette. Smooth graceful slow motion. No text, no captions.
```

#### conn_3 (dive_3 → dive_4)
```
Single continuous cinematic camera move, no cuts. The camera smoothly pulls up and back out of the STRIDE research laboratory, rising into the sky above the miniature museum complex, then glides forward across the connected miniature world and arrives above the Results Gallery wing, beginning to descend toward it. One connected miniature clay world, seamless flowing aerial transition. Clay diorama natural history museum, isometric tilt-shift miniature, warm limestone halls, amber chandeliers, deep mahogany palette. Smooth graceful slow motion. No text, no captions.
```

#### conn_4 (dive_4 → dive_5)
```
Single continuous cinematic camera move, no cuts. The camera smoothly pulls up and back out of the Results Gallery museum wing, rising into the sky above the miniature museum complex, then glides forward across the connected miniature world and arrives above the Reading Room wing, beginning to descend toward it. One connected miniature clay world, seamless flowing aerial transition. Clay diorama natural history museum, isometric tilt-shift miniature, warm limestone halls, amber chandeliers, deep mahogany palette. Smooth graceful slow motion. No text, no captions.
```

---

### 6. Download and re-encode each connector

```bash
ffmpeg -i ~/Downloads/<kling_filename>.mp4 \
  -an -g 8 -crf 20 -movflags +faststart \
  -y public/museum/vid/conn_N.mp4
```

Replace `conn_N` with the correct number (0–4).

---

### 7. Verify seams

After all clips are in place, spot-check each seam visually:

```bash
# Play last 1s of dive + first 1s of connector side-by-side (manual check)
ffplay public/museum/vid/dive_0.mp4 -ss 4
ffplay public/museum/vid/conn_0.mp4
```

A good seam: the connector's first frame is visually identical to the dive's last frame. If there's a visible pop, re-roll that connector on Kling.

---

## Current asset status

| Clip | Status | Notes |
|---|---|---|
| `dive_0.mp4` | ✅ AI (Kling) | Grand Entrance, amber arches |
| `dive_1.mp4` | ✅ AI (Kling) | Hall of Giants |
| `dive_2.mp4` | ✅ AI (Kling) | Efficiency Era |
| `dive_3.mp4` | ✅ AI (Kling) | STRIDE Lab |
| `dive_4.mp4` | ✅ AI (Kling) | Results Gallery |
| `dive_5.mp4` | ✅ AI (Kling) | Reading Room |
| `conn_0.mp4` | ✅ AI (Kling) | Grand Entrance → Hall of Giants |
| `conn_1.mp4` | ✅ AI (Kling) | Hall of Giants → Efficiency Era |
| `conn_2.mp4` | ✅ AI (Kling) | Efficiency Era → STRIDE Lab |
| `conn_3.mp4` | ✅ AI (Kling) | STRIDE Lab → Results Gallery |
| `conn_4.mp4` | ✅ AI (Kling) | Results Gallery → Reading Room |
| `still_0–5.jpg` | ✅ Done | PIL-generated museum scenes |

---

## Resuming with Claude

Once credits are topped up, paste this in Claude Code:

> "I've topped up Kling credits. Resume the Museum of Detectors video generation — generate dive_1 through dive_5, then extract seam frames and generate conn_0 through conn_4. Use the Chrome extension to run everything on Kling."

Claude has the prompts in this file and knows the full pipeline.

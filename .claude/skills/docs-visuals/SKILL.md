---
name: docs-visuals
description: Capture screenshots, short videos and GIFs of the Currents dashboard from the staging demo org, then embed them in a docs page. Use when a documentation page needs visual feedback — screenshots of a screen or menu, a clip showing an interaction like drag-and-drop, replacing stale images, or exploring an unfamiliar dashboard feature by driving the real UI before writing about it.
---

# Docs visuals from staging

Drive the real dashboard at `app-staging.currents.dev`, capture docs-ready
images and clips, and embed them in a page in this repo.

Two reasons to reach for this rather than describing a UI from source: the
capture is evidence the page is accurate, and driving the screen surfaces
details that reading components does not — which controls are hover-only, what
the empty state says, which affordances are dead code.

## First-time setup

Credentials are deliberately not in this repo. Create the env file once:

```bash
cat > ~/.currents-staging.env <<'EOF'
CURRENTS_STAGING_EMAIL=claude@currents.dev
CURRENTS_STAGING_PASSWORD=<staging password>
EOF
chmod 600 ~/.currents-staging.env
```

Then bootstrap the session:

```bash
node .claude/skills/docs-visuals/scripts/harness.js login
```

Playwright is borrowed from the `currents` monorepo checkout (this repo has no
`node_modules`). If it lives elsewhere, export `PLAYWRIGHT_DIR`. The harness
finds the locally installed chromium itself — do not reinstall browsers to fix a
version mismatch.

## Workflow

**1. Learn the screen before writing about it.** Take one throwaway capture and
read it. Print `body.innerText` and the interesting `aria-label`s. Verify that
every control mentioned in the docs actually renders — a component can exist in
source and never be mounted.

**2. Write a capture script.** One small file per docs page, saved next to the
harness in `scripts/` so the relative require works:

```js
// .claude/skills/docs-visuals/scripts/capture-<page>.js
const { shot, clip, mp, ensureSession, dragTo, grip } = require('./harness');

(async () => {
  await ensureSession();

  await shot('manage-projects-labels', {
    url: mp,
    viewport: { width: 1600, height: 780 },
    prepare: (page) => page.getByRole('tab', { name: 'Project Labels' }).click(),
  });

  await clip('manage-projects-drag', {
    url: mp,
    act: async (page) => {
      await dragTo(page, grip(page, 'Nightly Regression'), page.getByText('Web Platform').last());
    },
  });
})();
```

See `scripts/example-capture.js` for a longer one covering menus, popovers and
publishing a draft.

**3. Convert clips.**

```bash
.claude/skills/docs-visuals/scripts/media.sh mp4 out/manage-projects-drag.webm 2 8
.claude/skills/docs-visuals/scripts/media.sh gif out/manage-projects-drag.webm 2 4
```

Prefer mp4 — roughly a tenth the size of the same gif. Use gif only for short
loops (under ~4s) where silent autoplay matters. Both embed identically in
GitBook.

**4. Move assets in and embed.** Names are kebab-case and describe the subject,
not the act of capturing (`manage-projects-folder-actions.png`, not
`screenshot-3.png`).

```bash
cp .claude/skills/docs-visuals/out/*.png .gitbook/assets/
```

```markdown
<figure><img src="../../.gitbook/assets/manage-projects-labels.png" alt=""><figcaption><p>The organization's label registry</p></figcaption></figure>
```

The `../../` depth is relative to the page — one `../` per directory below the
repo root. Every asset must be referenced by a page; drop the rest.

**5. Check what shipped.** Open each final image and look at it. Reviewers
catch a stray badge or an empty-state metric long after the diff is merged.

## House style

- **1600 CSS px wide, `deviceScaleFactor: 2`** for stills; the harness defaults
  to this. Tune `viewport.height` so the content roughly fills the frame — a
  tall screenshot with 400px of empty page below it reads as a mistake.
- **Light theme.** Existing docs assets are light; a dark capture will stand out.
- **Never `fullPage: true`** unless the page genuinely needs its whole length.
  It produces very tall images that render unreadably narrow in GitBook.
- **Videos at `deviceScaleFactor: 1`**, 1440×810. DSF 2 quadruples the file for
  no visible gain after downscaling.
- **Show the sidebar** when the point involves navigation or the effect of a
  setting; crop to the panel when it does not.

## Non-negotiable: sanitise every frame

Raw captures carry the orange **"staging environment"** badge, a **trial
countdown** that changes daily, and the internal **`claude@currents.dev`**
account. `shot()` and `clip()` remove all three automatically. Do not bypass
`sanitize()`, and if a capture is taken by other means, check the corners before
committing it.

Add to `hide` for anything else that should not ship:

```js
await shot('x', { sanitizeOpts: { hide: [/^Internal preview$/], replace: { 'Currents Demo': 'Acme Corp' } } });
```

## Do not mislead

The demo org has **no run data** — metrics render as `0` and `—`. That is
acceptable for structural screenshots and unacceptable for anything documenting
charts, trends or analytics; those need an org with real runs, so say so rather
than shipping an empty chart.

Two related rules:

- **Never doctor a screenshot to agree with the prose.** If the UI contradicts
  the documented behavior, that is a product bug — report it and leave the image
  out rather than editing pixels.
- **Do not capture another org's data.** Use the demo org; if a capture needs
  real runs, ask before pointing this at a customer org.

## Reference

`references/staging-ui.md` — the demo org's contents, Radix selector traps, the
pointer-based (not HTML5) drag engine, hover-only controls, draft lifetime, and
what a broken org bootstrap looks like. Read the relevant section before
guessing at selectors.

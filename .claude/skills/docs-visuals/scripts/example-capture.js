/**
 * Worked example: the eight stills behind
 * `dashboard/administration/manage-projects.md`, plus one motion clip.
 *
 *   node .claude/skills/docs-visuals/scripts/example-capture.js
 *
 * Re-running it reproduces the committed assets, so it is also the regression
 * test for the harness. Copy it as the starting point for a new docs page.
 */

const { APP, mp, shot, clip, ensureSession, dragTo, grip } = require('./harness');

/** Scope to the portalled popover — a bare locator would hit the row beneath. */
const popover = (page) => page.locator('[data-radix-popper-content-wrapper]');

async function main() {
  await ensureSession();

  // --- plain tabs -----------------------------------------------------------
  await shot('manage-projects-structure', { url: mp, viewport: { width: 1600, height: 780 } });

  for (const [name, tab] of [
    ['manage-projects-labels', 'Project Labels'],
    ['manage-projects-preview', 'Project Preview'],
  ]) {
    await shot(name, {
      url: mp,
      viewport: { width: 1600, height: 780 },
      prepare: (page) => page.getByRole('tab', { name: tab }).click(),
    });
  }

  // --- hover-revealed menus -------------------------------------------------
  // Taller viewport: these popovers are ~700px and would otherwise be clipped.
  await shot('manage-projects-folder-actions', {
    url: mp,
    viewport: { width: 1600, height: 1150 },
    prepare: async (page) => {
      await page.getByRole('button', { name: 'Folder actions for Web Platform' }).click();
      await page.waitForTimeout(1200);
    },
  });

  await shot('manage-projects-project-labels', {
    url: mp,
    viewport: { width: 1600, height: 900 },
    prepare: async (page) => {
      await page.getByRole('button', { name: 'Decorate Web App E2E' }).click();
      await page.waitForTimeout(900);
      await popover(page).getByRole('tab', { name: 'Labels' }).click();
      await page.waitForTimeout(600);
    },
  });

  // --- a draft state, captured without publishing it ------------------------
  // Adding a folder dirties the draft so the confirmation popover can be shown.
  // Nothing is confirmed, and the draft dies with the browser context — the
  // org's published layout is untouched.
  await shot('manage-projects-save', {
    url: mp,
    viewport: { width: 1600, height: 900 },
    prepare: async (page) => {
      await page.getByLabel('New folder name').fill('Experiments');
      await page.getByRole('button', { name: 'Add folder' }).click();
      await page.waitForTimeout(700);
      await page.getByRole('button', { name: 'Save for everyone' }).first().click();
      await page.waitForTimeout(1000);
    },
  });

  // --- the projects landing page -------------------------------------------
  await shot('projects-customize-menu', {
    url: APP,
    viewport: { width: 1600, height: 800 },
    settle: 8000,
    prepare: async (page) => {
      await page.getByRole('button', { name: 'Customize' }).click();
      await page.waitForTimeout(1000);
    },
  });

  await shot('projects-page-folders', { url: APP, viewport: { width: 1600, height: 900 }, settle: 8000 });

  // --- motion ---------------------------------------------------------------
  // Drag a top-level project into a folder, then discard so the org is left as
  // it was. Convert with: scripts/media.sh mp4 out/manage-projects-drag.webm 4
  await clip('manage-projects-drag', {
    url: mp,
    act: async (page) => {
      const row = page.getByText('Nightly Regression', { exact: true }).last();
      await row.hover();
      await page.waitForTimeout(400);
      await dragTo(page, grip(page, 'Nightly Regression'), page.getByText('Mobile Apps', { exact: true }).last());
      await page.waitForTimeout(1200);
      await page.getByRole('button', { name: 'Discard changes' }).click();
      await page.waitForTimeout(800);
    },
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

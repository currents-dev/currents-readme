# Staging UI reference

Hard-won details about driving `app-staging.currents.dev`. Read the section for
the surface being captured before writing selectors.

## The demo org

`6aa2d36e073f4b2c7e013045` — "Currents Demo", created for docs captures. It is a
free-trial org with **no run data**, so every metric renders as `0` / `—`.
That is fine for structural screenshots (navigation, forms, layout) and wrong
for anything about charts, trends or analytics — those need an org with runs.

Published layout, as of the Manage Projects docs:

| Folder | Icon / color | Label | Projects |
| --- | --- | --- | --- |
| Web Platform | Web / blue | `team-web` | Web App E2E (`critical`), Web App Components, Design System |
| Mobile Apps | Mobile / green | `team-mobile` | Mobile iOS, Mobile Android |
| Backend APIs | Server / amber | — | Checkout API (`critical`), Payments API |
| _(top level)_ | — | — | Nightly Regression (`nightly`) |

Labels in the registry: `critical`, `nightly`, `team-web`, `team-mobile`.

A second, empty org (`6aa2d34b073f4b2c7e013041`, also "Currents Demo") exists as
a leftover duplicate. Always target the org id explicitly rather than relying on
whichever org is active.

Changing this layout changes every screenshot that shows the sidebar. Prefer
adding a folder/project over renaming existing ones, and re-capture the affected
pages if the structure moves.

## Every frame needs sanitising

Three things leak into raw captures and must not reach docs:

- the orange **"staging environment"** badge, fixed bottom-right (`z-[10000]`);
- the **"Free Trial Ends in N days"** countdown, top-right — also unstable, the
  number changes daily and creates noisy image diffs;
- **`claude@currents.dev`**, in the sidebar footer and in "Last saved … by …".

`sanitize()` in `harness.js` handles all three and runs automatically inside
`shot()` and `clip()`. It mutates the live DOM, so anything that navigates or
re-renders needs another pass — `shot()` re-runs it after `prepare` for that
reason.

## Radix primitives

The dashboard is built on Radix, which breaks the usual guesses:

- Dropdown items are `[role="menuitem"]`, **not** `[role="option"]`. Triggers
  are `[role="combobox"]`.
- Menus and popovers are portalled to the end of `<body>`. Scope queries to
  `[data-radix-popper-content-wrapper]`, otherwise a click lands on the row
  underneath and Playwright reports the popover "intercepts pointer events".
- Closing a popover: `page.keyboard.press('Escape')`. Clicking outside often
  hits another control.
- Tabs are `[role="tab"]`; `getByRole('tab', { name: 'Project Labels' })` works.

## The project tree is not HTML5 drag-and-drop

`FileTree` implements its own pointer-event engine: `pointermove` hit-tests rows
each frame and `pointerup` commits, with a 4px activation threshold.
Consequences:

- `locator.dragTo()` silently does nothing. Use `dragTo()` from the harness,
  which does move → down → stepped moves → up.
- There are no `draggable="true"` nodes in the DOM, so do not look for them.
- The grab target is a dedicated handle revealed on row hover:
  `button[aria-label="Drag to move or reorder"]` for projects,
  `button[aria-label="Drag to reorder folder"]` for folders. Use `grip()`.
- Dropping **onto a folder header** moves a project into it; dropping between
  rows reorders. To send a project to the end of the root list, drag to just
  below the last row.

## Hover-revealed controls

Row actions are `opacity-0` until hover, but Playwright still considers them
visible (opacity is not a visibility test), so they can be clicked directly.
Their labels embed the entity name:

- `Folder actions for <folder>` — rename, icon, color, labels, delete
- `Decorate <project>` — icon, accent, labels, manage, archive
- Inside either: tabs `Icons` / `Labels`; colors are `No color`, `Info`,
  `Success`, `Warning`, `Error`; icons use their own names (`Web`, `Mobile`,
  `Server`, …).

## Drafts do not survive a reload

Manage Projects holds edits in a local draft. A page load discards them, so any
capture that needs a modified layout must create, modify and (if the state
should persist) publish it **within one `shot()` / `clip()` call**. Publishing
is `Save for everyone` → confirm in the popover.

To show an unsaved-draft state without changing the org, make the edit and
capture it but never confirm the save — closing the context discards it.

## Session

Cognito tokens last about a day. `ensureSession()` detects an expired session
and re-signs-in, so just call it at the start of a run. The saved state lives in
`.session/state.json` (gitignored — it is a live credential).

The login form is two-step: email → `Continue` → password → `Sign In`. On some
builds the second button is also labelled `Continue`; the harness handles both.

## Known trap

If the dashboard renders the "Create Organization" screen on every route, the
account's org bootstrap query is failing — usually a corrupt membership record
in an unrelated org (`Cannot return null for non-nullable field OrgMember.memberId`).
It is not fixable from the docs side; it needs an admin to repair the membership.
Check the browser console before assuming the credentials are wrong.

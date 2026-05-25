## Repository Overview

This is the **Currents documentation repository** - a GitBook-powered documentation site for Currents, a cloud platform and dashboard for test orchestration. Currents specializes in Playwright testing but also supports Cypress, Jest, WebdriverIO, and other testing frameworks.

## Key Architecture

### Documentation Structure
- **GitBook Configuration**: Uses `.gitbook.yaml` for GitBook configuration with redirect mappings
- **Content Organization**: Documentation is organized in logical sections:
  - `getting-started/` - Onboarding guides for different frameworks (Playwright, Cypress, Jest)
  - `guides/` - Advanced topics like CI optimization, parallelization, code coverage
  - `dashboard/` - Dashboard features and administration guides
  - `resources/` - API documentation, integrations, and technical references
  - `ci-setup/` - CI/CD integration guides for major platforms

### Navigation
- `SUMMARY.md` defines the GitBook table of contents and navigation structure
- `README.md` serves as the main landing page
- Content is cross-referenced extensively with GitBook's internal linking system

## Content Management

### File Structure Patterns
- Each major section has a `README.md` as an index/overview page
- Individual features/topics have dedicated markdown files
- Screenshots and assets are stored in `.gitbook/assets/`

### Framework-Specific Content
- **Playwright**: Primary focus with comprehensive guides in `getting-started/playwright/`
- **Cypress**: Legacy support with guides in `getting-started/cypress/`
- **Jest**: Mobile testing support in `getting-started/jest/`
- **CI Providers**: Extensive platform-specific guides in `getting-started/ci-setup/`

### Key Integration Points
- Reporter packages: `@currents/playwright`, `@currents/cypress`, `@currents/jest`
- Configuration files: `currents.config.ts`, `playwright.config.ts`
- CLI tools: `pwc` for Playwright, `cypress-cloud` for Cypress

## Common Workflows

Since this is a documentation repository with no build process:

- **Content Updates**: Direct markdown editing
- **Structure Changes**: Update `SUMMARY.md` for navigation changes
- **Redirects**: Manage URL redirects in `.gitbook.yaml`
- **No Build Commands**: GitBook handles rendering automatically

## Documentation Standards

- Use GitBook-flavored markdown with custom frontmatter (description, icon fields)
- Screenshots should be referenced from `.gitbook/assets/`
- Cross-references use GitBook's internal linking syntax
- Code examples should be framework-specific and executable
- Maintain consistent structure: Overview → Setup → Configuration → Usage

## API Documentation Guidelines

The API documentation follows a structured pattern in `resources/api/`. When documenting API resources:

### API Resource Structure
Each API resource should follow this template structure:

1. **Resource Overview**: Brief description of what the resource represents
2. **Resource Relationships**: Explain how it relates to other resources 
3. **Endpoint Documentation**: For each endpoint include:
   - HTTP method and URL pattern with color-coded method badges: `<mark style="color:blue;">GET</mark>`, `<mark style="color:orange;">PUT</mark>`, `<mark style="color:red;">DELETE</mark>`
   - Path parameters table with required fields marked: `<mark style="color:red;">*</mark>`
   - Query parameters table with validation rules (limits, types)
   - Response examples using GitBook tabs: `{% tabs %}` / `{% tab title="200: OK" %}`

### API Documentation Patterns

**Base URL**: All API endpoints use `https://api.currents.dev/v1`

**Authentication**: Document using bearer token format in curl examples:
```bash
curl https://api.currents.dev/v1/resource \
-H "Authorization: Bearer API_KEY_HERE"
```

**Response Formats**: Use consistent JSON structure:
- Success responses: `{"status": "OK", "data": {...}}`
- List responses: Include `"has_more": boolean` for pagination
- Error responses: `{"status": "FAILED", "error": "message"}`

**Pagination**: Document two types:
- **Cursor-based**: Use `starting_after`, `ending_before`, `cursor` fields
- **Offset-based**: Use `page`, `limit`, `nextPage`, `total` fields

**Asset URLs**: Always include hint about signed URL expiration:
```
{% hint style="info" %}
Asset URLs (videos, screenshots) are signed URLs valid for 2h.
{% endhint %}
```

**Framework Differences**: Use GitBook tabs to show different response structures for Cypress vs Playwright when applicable.

**Cross-References**: Link related resources using GitBook syntax: `[resource.md](../path/resource.md "mention")`

### API Resource Files
- `resources/api/README.md` - API overview
- `resources/api/introduction.md` - Base URL, REST principles  
- `resources/api/authentication.md` - API key usage
- `resources/api/api-resources/` - Individual resource documentation
- `resources/api/pagination.md` - Pagination patterns
- `resources/api/errors.md` - HTTP status codes and error handling

## Cursor Cloud specific instructions

This is a pure documentation repository with no build process, no package manager, and no runtime dependencies. GitBook renders the site via its SaaS platform when changes are pushed to the repo.

### Linting

Run markdown lint (installed globally via npm):

```
markdownlint '**/*.md' --disable MD013 MD033 MD041 MD025 MD036 MD040 MD024 MD001
```

Many existing files trigger style warnings because GitBook-flavored markdown uses HTML elements and non-standard heading patterns. The disabled rules account for this.

### Link validation

Verify SUMMARY.md links resolve to real files:

```
python3 -c "
import re, os
with open('SUMMARY.md') as f:
    content = f.read()
links = re.findall(r'\[.*?\]\((.*?)\)', content)
local = [l for l in links if not l.startswith('http')]
missing = [l for l in local if not os.path.exists(l.split('#')[0].split(' ')[0].strip('\"'))]
print(f'Local: {len(local)}, Broken: {len(missing)}')
for m in missing: print(f'  BROKEN: {m}')
"
```

### Local preview

Serve docs locally with `python3 -m http.server 8080 --directory /workspace` for raw markdown or install `grip` (`pip install grip`) for GitHub-style rendered preview at port 8080.

### Key files

- `.gitbook.yaml` - GitBook config with URL redirects
- `.gitbook/vars.yaml` - Template variables (e.g. `LATEST_PW_IMAGE_VERSION`)
- `SUMMARY.md` - Table of contents / navigation structure (189 entries)

### Gotchas

- There are no automated tests in this repo; linting and link validation are the only programmatic checks.
- GitBook uses custom markdown extensions (`{% hint %}`, `{% tabs %}`, `{% content-ref %}`) that standard markdown renderers won't process.
- When adding new pages, always add them to `SUMMARY.md` and verify the file path resolves.
# GoQuant QA Automation – Buggy Cars Rating
This repository contains a Playwright end-to-end test suite for the Buggy Cars Rating web application.

Application under test: https://buggy.justtestit.org
Tech stack: JavaScript, Playwright Test

# Project structure
tests/

registration.spec.js – Registration module tests

login.spec.js – Login and header options tests

profile.spec.js – Profile view/update tests

models.spec.js – Model browsing and voting tests (Lamborghini → Miura)

ui-compat.spec.js – Global navigation and basic cross‑browser checks

smoke.spec.js – Optional high‑level sanity checks

pages/

Page Object Model classes (HomePage, LoginPage, RegistrationPage, ProfilePage, ModelsPage, etc.)

test-data/

Static JSON test data (users, models)

playwright.config.js

Shared Playwright configuration (projects, baseURL, reporters, tracing)

playwright-report/

HTML test report (generated)

test-results/

Traces, screenshots, videos (generated)

test-results.xml

JUnit report (generated)

# Prerequisites
Node.js 18+

npm

# Setup
Install dependencies:

bash
npm install
(Optional) Install browsers:

bash
npx playwright install

# Running tests
Run the full suite on Chromium:

bash
npx playwright test --project=chromium
Run only a specific module, e.g. models:

bash
npx playwright test tests/models.spec.js --project=chromium
Run in both Chromium and Edge (as defined in playwright.config.js):

bash
npx playwright test
Reports and artifacts
HTML report:

bash
npx playwright show-report
This opens playwright-report/index.html with all modules (Registration, Login, Profile, Models, UI, Cross‑browser).

# Reports and artifacts (screenshots, videos, traces):

Stored per run under test-results/ (config currently uses trace: 'on', screenshot: 'on', video: 'on' for the final demo run).

For submission, you can zip playwright-report/ (and optionally test-results/) and share along with this repository.

# Test coverage (summary)
Registration:

Valid registration

Mandatory field validation

Login:

Valid and invalid credentials

Header options (FirstName, Profile, Logout)

Registration message persistence (known bug)

Profile:

View profile

Update and cancel update

Models (Lamborghini → Miura):

Make navigation (Lamborghini models table)

Open Miura model details

Model details view (specs, votes, comments table)

Comment field visibility

Voting flow (vote count increases on details and list)

Comments HTML/script tags behaviour – XSS bug in comments table (intentionally failing check)

# UI / Cross‑browser:

Global navigation links

Critical flows on Chromium and Edge

# Known issues and assumptions
Two functional login issues and one XSS vulnerability are documented in Bug_Report.docx and reproduced by the Playwright suite.

Some model tests required robust selectors due to dynamic markup and repeated links on the Lamborghini make page; current implementation focuses on Miura as the reference model.

Test data for main flows (user credentials, make/model names) is stored in JSON; this can be extended to Excel/CSV in future if needed.

# How to run tests locally (quick steps)
Clone repo.

Run npm install.

Run npx playwright test --project=chromium.

Open npx playwright show-report to inspect results.


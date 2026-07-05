# QA Engineer Take-Home Assignment

## Overview

This repository contains my solution for the QA Engineer Take-Home Assignment using **Playwright** and **TypeScript**.

The project covers both **UI Automation** and **API Automation** while following Playwright best practices, including Page Object Model (POM), custom fixtures, reusable test data, and environment-based configuration.

---

## Tech Stack

* Playwright
* TypeScript
* Node.js
* Playwright Test Runner

---

## Project Structure

```
my-qa-assignment/
│
├── fixtures/
│   └── pageFixture.ts
│
├── pages/
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── CheckoutCompletePage.ts
│
├── test-data/
│   └── users.ts
│
├── tests/
│   ├── ui/
│   │   ├── login.spec.ts
│   │   ├── cart.spec.ts
│   │   ├── checkout.spec.ts
│   │   └── sort.spec.ts
│   │
│   └── api/
│       └── users.spec.ts
│
├── utils/
│   ├── apiHeaders.ts
│   ├── apiRoutes.ts
│   └── constants.ts
│
├── .env
├── playwright.config.ts
├── package.json
└── README.md
```

---

## Implemented Test Scenarios

### UI Automation (SauceDemo)

* Standard user can log in successfully.
* Locked user receives the expected error message.
* Add two products to the shopping cart.
* Verify the cart badge updates correctly.
* Complete the checkout flow.
* Verify the successful order confirmation message.
* Sort products by **Price (Low to High)**.
* Verify the first displayed product is the lowest-priced item.

### API Automation (ReqRes)

* GET `/api/users?page=2`

  * Verify HTTP status.
  * Verify the response contains a `data` array.
  * Validate the expected user fields.

* POST `/api/users`

  * Verify HTTP status.
  * Verify the created user details.
  * Verify `id` and `createdAt`.

* Bonus

  * Demonstrate a create-then-verify flow using the POST response.

---

## Framework Design

This project follows a lightweight Page Object Model architecture.

### Highlights

* Page Object Model (POM)
* Custom Playwright fixtures
* Environment-based configuration
* Reusable test data
* Centralized constants
* Reusable API routes and headers
* Independent and parallel-safe tests
* Semantic Playwright locators (`getByTestId`)
* No hard waits or XPath locators

---

## Prerequisites

* Node.js (v18 or above recommended)
* npm

---

## Installation

Clone the repository and install the dependencies.

```bash
npm install
```

Install Playwright browsers.

```bash
npx playwright install
```

---

## Environment Configuration

The project uses a `.env` file for configuration.

Example:

```env
BASE_URL=https://www.saucedemo.com
API_BASE_URL=https://reqres.in
REQRES_API_KEY=<your_reqres_api_key>
```

> **Note:** ReqRes now requires an API key for public endpoints. Generate a free API key from the ReqRes portal and update the `REQRES_API_KEY` value before running the API tests.

---

## Running Tests

Run the complete test suite.

```bash
npx playwright test
```

Run only UI tests.

```bash
npx playwright test tests/ui
```

Run only API tests.

```bash
npx playwright test tests/api
```

Run a specific test file.

```bash
npx playwright test tests/ui/login.spec.ts
```

Run tests in headed mode.

```bash
npx playwright test --headed
```

---

## Test Report

After execution, open the Playwright HTML report.

```bash
npx playwright show-report
```

---

## Design Decisions

* Used Page Object Model to improve maintainability and readability.
* Used Playwright fixtures to reduce duplication and provide reusable page object instances.
* Kept assertions inside test files to maintain separation of responsibilities.
* Used semantic locators (`getByTestId`) instead of XPath or fragile CSS selectors.
* Stored reusable values such as test data, routes, and constants in dedicated modules.
* Configured the application through environment variables for flexibility.

---

## Future Improvements

With additional time, I would consider:

* Adding API schema validation.
* Integrating ESLint and Prettier.
* Adding GitHub Actions for CI.
* Implementing retries based on environment.
* Adding custom Playwright reporters.
* Expanding negative API test coverage.

---

## Notes

* Chromium is used for execution as required by the assignment.
* Tests are independent and can run in any order.
* API tests use Playwright's `APIRequestContext`.

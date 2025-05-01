# @testing-library/react test patterns

- [vitest: component](app/components/Counter.test.tsx)
- [vitest: react hooks](app/components/useCounter.test.tsx)
- [vitest: jotai](app/components/JotaiApp.test.tsx)
- [vitest: network mock](app/lib/request.test.ts)
- [Vitest: react-router route](app/routes/home.test.tsx)
- [Playwright: Tests](e2e/state-counter.spec.ts)
- [Playwright: Snapshot Tests](e2e/index.spec.ts)

## Run

```bash
npm install
# dev server
npm run dev
# vitest
npm test
# vitest with coverage
npm test:cov
# playwright
npx playwright install-deps # run once
npm run e2e
```

## Coverage

```bash

 ✓ app/components/Counter.test.tsx (2 tests) 26ms
 ✓ app/routes/home.test.tsx (1 test) 27ms
 ✓ app/components/JotaiApp.test.tsx (2 tests) 41ms
 ✓ app/components/useCounter.test.tsx (2 tests) 166ms

 Test Files  4 passed (4)
      Tests  7 passed (7)
   Start at  20:34:10
   Duration  977ms (transform 81ms, setup 427ms, collect 164ms, tests 261ms, environment 1.35s, prepare 414ms)

 % Coverage report from v8
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------------|---------|----------|---------|---------|-------------------
All files          |   60.63 |       75 |      60 |   60.63 |
 app               |       0 |        0 |       0 |       0 |
  root.tsx         |       0 |        0 |       0 |       0 | 1-75
  routes.ts        |       0 |        0 |       0 |       0 | 1-11
 app/components    |     100 |      100 |     100 |     100 |
  Counter.tsx      |     100 |      100 |     100 |     100 |
  JotaiApp.tsx     |     100 |      100 |     100 |     100 |
 app/routes        |   29.41 |       50 |   33.33 |   29.41 |
  home.tsx         |      50 |      100 |      50 |      50 | 5-9
  state.tsx        |       0 |        0 |       0 |       0 | 1-10
 app/store         |     100 |      100 |     100 |     100 |
  globalCounter.ts |     100 |      100 |     100 |     100 |
 app/welcome       |     100 |      100 |     100 |     100 |
  welcome.tsx      |     100 |      100 |     100 |     100 |
-------------------|---------|----------|---------|---------|-------------------
```

## Debug playwright e2e

```bash
## Debug single test
$ npx playwright test e2e/target.spec.ts

## with ui
$ npx playwright test --ui

## debug with headful runner
$ npx playwright test --headed --debug
```

## How to setup This

For learner

```bash
$ npx -y create-react-app@latest
```

### vitest setup

```bash
$ npm add vitest @testing-library/react @testing-library/jest-dom/vitest happy-dom -D
```

vite.config.ts

```ts
  test: {
    include: ["**/*.test.tsx", "**/*.test.ts"],
    environment: "happy-dom",
    setupFiles: "./test/setup.ts",
  },
```

test/setup.ts for cleanup

```ts
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { beforeEach } from "vitest";

// Run cleanup after each test case (e.g., clearing jsdom)
beforeEach(() => {
  cleanup();
});
```

Add `.github/workflows/test.yml`

## playwright setup

```bash
$ npm init playwright@latest
# Generate .github/workflows/playwright.yml
# Generate playwright.config.ts
```

Run web server on playwright start.

```ts
  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    stdout: "pipe",
    stderr: "pipe",
    reuseExistingServer: !process.env.CI,
  },
```

Run

```bash
$ npx playwright test
```

---

## LLM Cover Agent (ja)

````markdown
あなたの役割は、フロントエンドのエキスパートとしてテストコードを追加することです。カバレッジ 100%を目指します。

最初に `npx vitest --run --coverage --reporter=dot` を実行して、テストが通っていることと、現在のテストカバレッジを確認します

カバレッジが低いものから優先に、テストコードをユーザーに提案します。

テストは必ず一件ずつ追加して、`npx vitest --run <target>` でテストが通過することを確認します。

### app/components/\*.tsx

React Component として次のコードを参考にテストを追加します。

```ts
// app/components/counter.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Counter from "./Counter";

it("autogen: Counter", () => {
  render(<Counter />);
});
```

### app/routes/\*.tsx

react-router に対して Stub のテストパターンを追加します。

```tsx
// app/routes/home.test.tsx
import { test, expect } from "vitest";
import { createRoutesStub } from "react-router";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "./home";

test("autogen: Home route", async () => {
  const Stub = createRoutesStub([{ path: "/", Component: Home }]);
  render(<Stub />);
  await waitFor(() => {
    screen.findByText("Display Result");
  });
});
```

### app/use-\*.tsx

React Hooks 関数に対してテストを追加します。

```tsx
// useCounter.test.tsx
import { renderHook, act, waitFor, render } from "@testing-library/react";
import { use, useEffect, useState, useActionState } from "react";
import { describe, expect, test } from "vitest";

test("autogen: useCounter", () => {
  const { result } = renderHook(useCounter);
  expect(result.current.count).toBe(0);
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});
```

### Network Mocking

msw/node でネットワークを mock します。

```ts
import { afterAll, beforeAll, expect, test } from "vitest";
import { getUser } from "./request";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const mockServer = setupServer(
  http.get("/api/user", () => {
    return HttpResponse.json({
      id: "123",
      name: "John Doe",
    });
  })
);

beforeAll(() => {
  mockServer.listen();
});

afterAll(() => {
  mockServer.restoreHandlers();
});

test("getUser", async () => {
  const res = await getUser();
  expect(res).toEqual({
    id: "123",
    name: "John Doe",
  });
});
```

### others

React に関係ないものは、純粋な TypeScript のロジックとしてテストします。
````

---

# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, expect } from "vitest";
import { Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { JotaiCounterApp } from "./JotaiApp";
import { countAtom } from "../store/globalCounter";

test("should increment jotai counter", async () => {
  render(
    <Provider>
      <JotaiCounterApp />
    </Provider>
  );
  const counter = screen.getByText("Count: 0");
  const incrementButton = screen.getByTestId("jotai-counter");
  await userEvent.click(incrementButton);
  expect(counter.textContent).toEqual("Count: 1");
});

// injected state app
function TestJotaiApp() {
  useHydrateAtoms([[countAtom, 100]]);
  return <JotaiCounterApp />;
}

test("with initial counter 100", async () => {
  render(
    <Provider>
      <TestJotaiApp />
    </Provider>
  );
  const counter = screen.getByText("Count: 100");
  const incrementButton = screen.getByTestId("jotai-counter");
  await userEvent.click(incrementButton);
  expect(counter.textContent).toEqual("Count: 101");
});

import {
  startTransition,
  Suspense,
  use,
  useActionState,
  useEffect,
} from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Counter from "./Counter";

function AsyncApp(props: { promise: Promise<number> }) {
  const val = use(props.promise);
  return (
    <div>
      <p>{val}</p>
    </div>
  );
}

it("React v19: with promise props", async () => {
  const v = Promise.resolve(42);
  await act(async () => {
    render(
      <Suspense fallback={<div>Loading...</div>}>
        <AsyncApp promise={v} />
      </Suspense>
    );
  });
  expect(screen.getByText("42")).toBeInTheDocument();
});

function AsyncActionApp() {
  const [state, dispatch, isPending] = useActionState<number, number>(
    async (s, a) => s + a,
    0
  );

  const handleClick = () => {
    startTransition(() => {
      dispatch(1);
    });
  };
  if (isPending) {
    return (
      <div>
        <button onClick={handleClick}>init</button>
      </div>
    );
  }
  return (
    <div>
      <button onClick={handleClick}>init</button>
      <p>{state}</p>
    </div>
  );
}

it("React v19: useActionState", async () => {
  const { rerender } = render(<AsyncActionApp />);
  expect(screen.getByText("0")).toBeInTheDocument();
  const button = screen.getByRole("button", { name: /init/i });
  fireEvent.click(button);
  await act(async () => {
    rerender(<AsyncActionApp />);
  });
  expect(screen.getByText("1")).toBeInTheDocument();
});

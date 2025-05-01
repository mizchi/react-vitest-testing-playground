// useCounter.test.tsx
import { renderHook, act, waitFor, render } from "@testing-library/react";
import { use, useEffect, useState, useActionState } from "react";
import { describe, expect, test } from "vitest";

describe("hooks test example", () => {
  const useCounter = (initialCount?: number) => {
    const [count, setCount] = useState(initialCount ?? 0);
    const increment = () => setCount((prevCount) => prevCount + 1);
    return { count, increment };
  };

  test("should render the initial count", () => {
    const { result } = renderHook(useCounter);
    expect(result.current.count).toBe(0);
    act(() => result.current.increment());
    expect(result.current.count).toBe(1);
  });
});

describe("lazy hooks example", () => {
  const getLazyValue = async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return { value: 42 };
  };
  const useLazyValue = () => {
    const [data, setData] = useState<null | { value: number }>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      (async () => {
        const data = await getLazyValue();
        setLoading(false);
        setData(data);
      })();
    }, []);
    return { data, loading };
  };
  test("resolve 42", async () => {
    const { result } = renderHook(useLazyValue);
    expect(result.current.data).toBe(null);
    // wait for loading
    await waitFor(() => expect(result.current.loading).toEqual(false));
    expect(result.current.data).toEqual({ value: 42 });
  });
});

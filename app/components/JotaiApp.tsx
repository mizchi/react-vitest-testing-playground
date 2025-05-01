import { useAtomValue, useSetAtom } from "jotai";

import { countAtom } from "../store/globalCounter";

export function JotaiCounterApp() {
  const count = useAtomValue(countAtom);
  const setCount = useSetAtom(countAtom);
  return (
    <div>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        data-testid="jotai-counter"
        onClick={() => {
          setCount((prev) => prev + 1);
        }}
      >
        Count: {count}
      </button>
    </div>
  );
}

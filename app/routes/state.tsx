import { Provider, useAtomValue, useSetAtom } from "jotai";
import { JotaiCounterApp } from "../components/JotaiApp";

export default function StatePage() {
  return (
    <Provider>
      <JotaiCounterApp />
    </Provider>
  );
}

import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Counter from "./counter";

describe("Counter component", () => {
  it("should render initial count", () => {
    render(<Counter />);
    const button = screen.getByRole("button", { name: /Count: 0/i });
    expect(button).toBeInTheDocument();
  });

  it("should increment count on button click", () => {
    render(<Counter />);
    // Use a more specific selector to find the button
    const button = screen.getByRole("button", { name: /Count: 0/i });
    fireEvent.click(button);
    // After clicking, the button text should update to "Count: 1"
    expect(
      screen.getByRole("button", { name: /Count: 1/i })
    ).toBeInTheDocument();
  });
});

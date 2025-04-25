import { test, expect } from "vitest";
import { createRoutesStub } from "react-router";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "./home";

test("renders the home page and navigation links", async () => {
  const Stub = createRoutesStub([{ path: "/", Component: Home }]);
  render(<Stub />);

  const logo = screen.getAllByRole("img", { name: /react router/i }).at(0);
  expect(logo).toBeInTheDocument();

  await waitFor(() => {
    screen.findByText("React Router Docs");
    screen.findByText("Join Discord");
  });
});

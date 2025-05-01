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

test("request", async () => {
  const res = await getUser();
  expect(res).toEqual({
    id: "123",
    name: "John Doe",
  });
});

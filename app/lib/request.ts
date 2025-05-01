export async function getUser(): Promise<{ id: string; name: string } | null> {
  const res = await fetch("/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return res.json();
}

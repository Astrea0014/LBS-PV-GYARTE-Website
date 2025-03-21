export function ThrowOnBadResponse(response: Response) {
  if (!response.ok)
    throw new Error(`${response.statusText} (${response.status}): ${response.headers.get("Error-Message")}`);
}

export function ThrowOnNaN(num: number) {
  if (Number.isNaN(num))
    throw new Error("Input value is not a valid number.");
}
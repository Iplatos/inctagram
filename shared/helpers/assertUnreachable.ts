export function assertUnreachable(value: never): never {
  throw new Error(`Didn't expect to reach this code. Unexpected value: ${value}`);
}

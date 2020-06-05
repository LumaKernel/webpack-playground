export class AssertionError extends Error { }

export function assert(value: unknown, message = ''): asserts value {
  if (!value) {
    throw new AssertionError(message);
  }
}

export type HueErrorType = [
  {
    error: { type: number; address: string; description: string };
  }
];

export const isError = (response: unknown): response is HueErrorType =>
  Array.isArray(response) && Object.hasOwnProperty.call(response[0], "error");

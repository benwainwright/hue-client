export interface UsernameRequestType {
  devicetype: string;
}

export interface LightState {
  on: boolean;
  bri: number;
  hue: number;
  sat: number;
  effect: string;
  xy: [number, number];
  ct: number;
  alert: string;
  colormode: string;
  mode: string;
  reachable: true;
}

export type HueErrorType = [
  {
    error: { type: number; address: string; description: string };
  }
];

export type UsernameResponseType = [
  {
    success: {
      username: string;
    };
  }
];

export const isError = (response: unknown): response is HueErrorType =>
  Array.isArray(response) && Object.hasOwnProperty.call(response[0], "error");

export type HttpMethod = "GET" | "POST" | "PUT";

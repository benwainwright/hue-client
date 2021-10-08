import { LightResponse } from "./light-response";

export type NewLightsResponse = {
  [key: string]: LightResponse | string;
  lastscan: string;
};

import { LightResponse } from "./light-response";

export type NewLightsResponse = {
  [K in string]: K extends "lastscan" ? string : LightResponse;
};

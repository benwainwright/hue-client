import { LightState } from "./light-state";

export type LightStateChange = Partial<
  Omit<LightState, "reachable" | "colormode" | "effect">
>;

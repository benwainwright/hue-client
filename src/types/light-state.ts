export interface LightState {
  on: boolean;
  bri: number;
  hue: number;
  sat: number;
  effect: string;
  xy: [number, number];
  ct: number;
  alert: `select` | `lselect` | `none`;
  colormode: "xy" | "hs";
  mode: string;
  reachable: boolean;
}

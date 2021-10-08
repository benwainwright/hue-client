type MacAddress = `${string}:${string}:${string}:${string}:${string}:${string}`;
export type IpAddress = `${string}.${string}.${string}.${string}`;

export interface ClientConfig {
  deviceType?: string;
  username?: string;
}

export const isIpAddress = (address: string): address is IpAddress => {
  const ipRegex = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/u;

  return Boolean(address.match(ipRegex));
};

export interface UpdateableBridgeConfig {
  name: string;
  dhcp: boolean;
  portalservices: boolean;
  linkbutton: boolean;
}

export interface SceneResponse {
  name: string;
  type: "GroupScene";
  group: string;
  lights: string[];
  owner: string;
  recycle: string;
  locked: string;
  appdata: { version: number; data: string };
  picture: string;
  image: string;
  lastupdated: string;
  version: 2;
}

export type ScenesResponse = { [key: string]: SceneResponse };

export type BridgeConfig = UpdateableBridgeConfig & {
  ipaddress: IpAddress;
  mac: MacAddress;
  netmask: IpAddress;
  gateway: IpAddress;
  proxyaddress: string;
  proxyport: number;
  UTC: string;
  whitelist: {
    [key: string]: {
      "last use date": string;
      "create date": string;
      name: string;
    };
  };
  swversion: string;
  swupdate: {
    updatestate: number;
    url: string;
    text: string;
    notify: boolean;
  };
};

export interface UsernameRequestType {
  devicetype: string;
}

export interface LightSwUpdate {
  state: string;
  lastinstall: string;
}

export interface LightCapabilities {
  certified: boolean;
  control: {
    mindimlevel: number;
    maxlumen: number;
    colorgamutttype: [number, number][];
    ct: {
      min: number;
      max: number;
    };
  };
  streaming: { renderer: boolean; proxy: boolean };
}

export interface LightConfig {
  archetype: string;
  function: string;
  direction: string;
  startup: { mode: string; configured: boolean };
}

export type LightsResponse = { [key: string]: LightResponse };

export type NewLightsResponse = {
  [key: string]: LightResponse | string;
  lastscan: string;
};

export interface LightResponse {
  state: LightState;
  swupdate: LightSwUpdate;
  type: string;
  name: string;
  modelid: string;
  manufacturername: string;
  productname: string;
  capabilities: LightCapabilities;
  config: LightConfig;
  uniqueid: string;
  swversion: string;
  swconfigid: string;
  productid: string;
}

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

export type LightStateChange = Partial<
  Omit<LightState, "reachable" | "colormode" | "effect">
>;

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

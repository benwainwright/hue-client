import { LightCapabilities } from "./light-capabilities";
import { LightConfig } from "./light-config";
import { LightState } from "./light-state";
import { LightSwUpdate } from "./light-sw-update";

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

import { IpAddress } from "./ip-address";
import { MacAddress } from "./mac-address";
import { UpdateableBridgeConfig } from "./updateable-bridge-config";

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

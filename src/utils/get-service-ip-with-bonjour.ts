import { IpAddress, isIpAddress } from "../types";
import bonjour from "bonjour";

const TIMEOUT = 2000;

export const getServiceIpWithBonjour = (type: string): Promise<IpAddress> =>
  new Promise<IpAddress>((accept, reject) => {
    const bonjourClient = bonjour();
    bonjourClient.find({ type }, (service) => {
      const ip = service.addresses.find(isIpAddress);
      if (!ip) {
        reject(new Error("Ip was not found in bonjour response"));
        return;
      }
      bonjourClient.destroy();
      accept(ip);
    });

    setTimeout(() => {
      bonjourClient.destroy();
      reject(new Error("Timed out looking for bridge"));
    }, TIMEOUT);
  });

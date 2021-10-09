import { IpAddress, isIpAddress } from "../types";
import bonjour from "bonjour";

const TIMEOUT = 2000;

export const getServiceIpWithBonjour = async (
  type: string
): Promise<IpAddress> =>
  await new Promise<IpAddress>((accept, reject) => {
    const timeout = setTimeout(() => {
      bonjourClient.destroy();
      reject(new Error("Timed out looking for bridge"));
    }, TIMEOUT);

    const bonjourClient = bonjour();
    bonjourClient.find({ type }, service => {
      const ip = service.addresses.find(isIpAddress);
      clearTimeout(timeout);
      if (!ip) {
        reject(new Error("Ip was not found in bonjour response"));
        return;
      }
      bonjourClient.destroy();
      accept(ip);
    });
  });

import { getServiceIpWithBonjour } from "./get-service-ip-with-bonjour";
import { LocalHueClient } from "./local-hue-client";
import { ClientConfig } from "./types";
import { Bridge } from "./bridge";
import { HueBridge } from "./hue-bridge";

export class BridgeLocator {
  public static async local(config: ClientConfig): Promise<HueBridge> {
    const ip = await getServiceIpWithBonjour("hue");
    const client = new LocalHueClient(ip, config.deviceType, config.username);

    const newConfig = { ...config, username: await client.getUsername() };

    return new Bridge(client, newConfig);
  }
}

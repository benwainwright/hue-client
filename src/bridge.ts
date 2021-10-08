import { LightResponse, BridgeConfig, ClientConfig } from "./types";
import { LocalHueClient } from "./local-hue-client";
import { Light } from "./light";
import { Scene } from "./scene";
import { Client } from "./client";
import { Config } from "./config";
import { getServiceIpWithBonjour } from "./get-service-ip-with-bonjour";

export class Bridge {
  private allLights: Light[] = [];
  private allScenes: Scene[] = [];

  private constructor(
    private client: Client,
    private clientConfig: ClientConfig
  ) {}

  public static async local(config: ClientConfig) {
    const ip = await getServiceIpWithBonjour("hue");
    const client = new LocalHueClient(ip, config.deviceType, config.username);

    const newConfig = { ...config, username: await client.getUsername() };

    return new Bridge(client, newConfig);
  }

  public get username() {
    return this.clientConfig.username;
  }

  public async config() {
    const response = await this.client.get<BridgeConfig>("/lights");
    return new Config(response, this.client);
  }

  public async scenes() {
    const response = await this.client.get<BridgeConfig>("/scenes");
    this.allScenes = Object.entries(response).map(
      ([id, response]) => new Scene(id, response, this.client)
    );
    return this.allScenes;
  }

  public async lights() {
    const response = await this.client.get<{ [key: string]: LightResponse }>(
      "/lights"
    );
    this.allLights = Object.entries(response).map(
      ([id, response]) => new Light(id, response, this.client)
    );
    return this.allLights;
  }
}

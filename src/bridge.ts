import { LightResponse, BridgeConfig, ClientConfig } from "./types";
import { Light } from "./light";
import { Scene } from "./scene";
import { Client } from "./client";
import { Config } from "./config";

export class Bridge {
  private allLights: Light[] = [];
  private allScenes: Scene[] = [];

  public constructor(
    private client: Client,
    private clientConfig: ClientConfig
  ) {}

  public get username() {
    return this.clientConfig.username;
  }

  public async config() {
    const response = await this.client.get<BridgeConfig>("/config");
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

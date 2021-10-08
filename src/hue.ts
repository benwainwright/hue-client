import { Client } from "./client";
import { Config } from "./config";
import { Light } from "./light";
import { Scene } from "./scene";
import { LightResponse, BridgeConfig } from "./types";

export class Hue {
  private allLights: Light[] = [];
  private allScenes: Scene[] = [];

  constructor(private client: Client) {}

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

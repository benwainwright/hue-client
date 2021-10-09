import {
  LightsResponse,
  NewLightsResponse,
  BridgeConfig,
  ClientConfig,
  ScenesResponse,
  HueBridge
} from "./types";
import { Light, Scene, Config } from "./resources";
import { Client } from "./types/client";

export class Bridge implements HueBridge {
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
    const response = await this.client.get<ScenesResponse>("/scenes");
    this.allScenes = Object.entries(response).map(
      ([id, response]) => new Scene(id, response, this.client)
    );
    return this.allScenes;
  }

  private async getAllLights() {
    return await this.client.get<LightsResponse>("/lights");
  }

  private async getNewLights(): Promise<LightsResponse> {
    const response = await this.client.get<NewLightsResponse>("/lights/new");

    const { lastscan, ...newLights } = response;

    return newLights;
  }

  public async lights() {
    const newLights =
      this.allLights.length === 0
        ? await this.getAllLights()
        : await this.getNewLights();

    this.allLights = [
      ...this.allLights,
      ...Object.entries(newLights).map(
        ([id, response]) => new Light(id, response, this.client)
      )
    ];
    return this.allLights;
  }
}

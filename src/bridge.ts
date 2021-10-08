import {
  LightsResponse,
  NewLightsResponse,
  BridgeConfig,
  ClientConfig,
  ScenesResponse
} from "./types";
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
    const response = await this.client.get<ScenesResponse>("/scenes");
    this.allScenes = Object.entries(response).map(
      ([id, response]) => new Scene(id, response, this.client)
    );
    return this.allScenes;
  }

  private async getAllLights() {
    return await this.client.get<LightsResponse>("/lights");
  }

  private async getNewLights() {
    const response = await this.client.get<NewLightsResponse>("/lights/new");

    const { lastscan, ...newLights } = response;

    const isLightsResponse = (
      newLights: unknown
    ): newLights is LightsResponse =>
      !Object.hasOwnProperty.call(newLights, "lastscan");

    if (isLightsResponse(newLights)) {
      return newLights;
    }
  }

  public async lights() {
    const newLights =
      this.allLights.length > 0
        ? await this.getAllLights()
        : await this.getNewLights();

    this.allLights = [
      ...this.allLights,
      ...Object.entries(newLights ?? {}).map(
        ([id, response]) => new Light(id, response, this.client)
      )
    ];
    return this.allLights;
  }
}

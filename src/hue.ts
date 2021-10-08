import { Client } from "./client";
import { Config } from "./config";
import { Light } from "./light";
import { Scene } from "./scene";
import { LightResponse, BridgeConfig } from "./types";

export class Hue {
  private allLights: Light[] = [];
  private allScenes: Scene[] = [];

  constructor(private client: Client) {}
}

import { SceneResponse } from "../types";
import { Client } from "../types";

export class Scene {
  constructor(
    private id: string,
    public response: SceneResponse,
    private client: Client
  ) {}

  public get name() {
    return this.response.name;
  }
}

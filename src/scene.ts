import { ScenesResponse } from "./types";
import { Client } from "./client";

export class Scene {
  constructor(
    private id: string,
    public response: ScenesResponse,
    private client: Client
  ) {}

  public get name() {
    return this.response.name;
  }
}

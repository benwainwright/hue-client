import { Client } from "./client";

export class Hue {
  constructor(private client: Client) {}

  public async lights() {
    return this.client.get("/lights");
  }
}

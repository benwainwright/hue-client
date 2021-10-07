import { Client } from "./client";

export class Hue {
  constructor(private client: Client) {}

  public async lights() {
    return await this.client.get("/lights");
  }

  public async light(id: string) {
    return await this.client.get(`/lights/${id}`);
  }
}

import { LightResponse, LightState } from "../types";
import { Client } from "../client";
import { MutableEntityClient } from "../mutable-entity-client";

export class Light {
  private client: MutableEntityClient<LightResponse>;

  constructor(public id: string, response: LightResponse, client: Client) {
    this.client = new MutableEntityClient(
      `/lights/${this.id}`,
      response,
      client
    );
  }

  public async reload() {
    this.client.reload();
  }

  public get response() {
    return this.client.response;
  }

  public async on() {
    return this.client.setState({ on: true });
  }

  public async off() {
    return this.client.setState({ on: false });
  }

  public async brightness(bri: number) {
    return this.client.setState({ bri });
  }

  public async hue(hue: number) {
    return this.client.setState({ hue });
  }

  public async saturation(saturation: number) {
    return this.client.setState({ sat: saturation });
  }

  public async flashOnce() {
    this.client.setState({ alert: "select" });
  }

  public async flashRepeat() {
    this.client.setState({ alert: "lselect" });
  }

  public get state(): LightState {
    return this.response.state;
  }

  public get name(): string {
    return this.response.name;
  }
}

import { LightResponse, LightState, LightStateChange } from "./types";
import { Client } from "./client";

export class Light {
  constructor(
    public id: string,
    public response: LightResponse,
    private client: Client
  ) {}

  public async setState(state: LightStateChange) {
    return await this.client.put(`/lights/${this.id}/state`, state);
  }

  public async on() {
    return this.setState({ on: true });
  }

  public async off() {
    return this.setState({ on: false });
  }

  public async brightness(bri: number) {
    return this.setState({ bri });
  }

  public async hue(hue: number) {
    return this.setState({ hue });
  }

  public async saturation(saturation: number) {
    return this.setState({ sat: saturation });
  }

  public async flashOnce() {
    this.setState({ alert: "select" });
  }

  public async flashRepeat() {
    this.setState({ alert: "lselect" });
  }

  public get state(): LightState {
    return this.response.state;
  }

  public get name(): string {
    return this.response.name;
  }
}

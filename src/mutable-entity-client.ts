import { Client } from "./types";

export class MutableEntityClient<T> {
  constructor(
    private path: string,
    public response: T,
    private client: Client
  ) {}

  public async setState<S>(state: S) {
    const result = await this.client.put(`${this.path}/state`, state);
    await this.reload();
    return result;
  }

  public async reload(): Promise<void> {
    this.response = await this.client.get(this.path);
  }
}

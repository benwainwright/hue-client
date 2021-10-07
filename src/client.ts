export interface Client {
  get: <R>(path: string) => Promise<R>;
}

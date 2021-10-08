export interface Client {
  get: <R>(path: string) => Promise<R>;
  put: <T, R>(path: string, data: T) => Promise<R>;
  post: <T, R>(path: string, data: T) => Promise<R>;
}

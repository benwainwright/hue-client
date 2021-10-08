import { Light } from "./light";

export interface HueBridge {
  username: string | undefined;
  lights: () => Promise<Light[]>;
}

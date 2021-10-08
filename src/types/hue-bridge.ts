import { Light } from "../resources";

export interface HueBridge {
  username: string | undefined;
  lights: () => Promise<Light[]>;
}

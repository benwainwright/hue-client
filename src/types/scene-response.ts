export interface SceneResponse {
  name: string;
  type: "GroupScene";
  group: string;
  lights: string[];
  owner: string;
  recycle: string;
  locked: string;
  appdata: { version: number; data: string };
  picture: string;
  image: string;
  lastupdated: string;
  version: 2;
}

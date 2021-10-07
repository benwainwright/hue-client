import { writeJson } from "fs-extra";

const defaultConfig = {
  ip: "192.168.1.102",
  deviceType: "client"
};

export const createConfig = (path: string) => {
  writeJson(path, defaultConfig);
};

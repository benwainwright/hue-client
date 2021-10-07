import * as path from "path";
import { HueClient } from "./hue-client";
import { Hue } from "./hue";
import { readJson, pathExists, writeJson } from "fs-extra";
import { createConfig } from "./create-config";

const CONFIG_FILE_NAME = "hue.json";

export const initialise = async () => {
  const configFilePath = path.resolve(process.cwd(), CONFIG_FILE_NAME);

  if (!(await pathExists(configFilePath))) {
    createConfig(configFilePath);
  }

  const loadedConfig = await readJson(configFilePath);

  const { ip, deviceType, username } = loadedConfig;

  const client = new HueClient(ip, deviceType, username);

  if (!username) {
    const newConfig = { ...loadedConfig, username: await client.getUsername() };
    writeJson(configFilePath, newConfig);
  }

  return new Hue(client);
};

import * as path from "path";
import { BridgeLocator } from "./src/bridge-locator";
import { readFile, writeFile } from "fs/promises";

const fileInCurrentDirectory = (file: string) =>
  path.resolve(process.cwd(), file);

const loadConfig = async (path: string) => {
  try {
    const config = JSON.parse(await readFile(path, "utf8"));

    if (typeof !config === "object") {
      throw new Error("Config file should be an object!");
    }
    return config;
  } catch {
    return {};
  }
};

const run = async () => {
  const configPath = fileInCurrentDirectory("hue.json");
  const config = await loadConfig(configPath);

  const bridge = await BridgeLocator.local(config);
  console.log("calling");

  await bridge.lights();
  await bridge.lights();

  console.log("second");

  const finalConfig = { ...config, username: bridge.username };

  writeFile(configPath, JSON.stringify(finalConfig, null, 2));
};

run().catch(error => {
  console.log(error);
});

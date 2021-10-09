import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  clearMocks: true,
  resetMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*"],
  coverageDirectory: "coverage",
  modulePathIgnorePatterns: ["dist", "node_modules"],
  setupFilesAfterEnv: ["jest-extended"]
};

export default config;

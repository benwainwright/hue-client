import { Config } from "@jest/types";

const config: Config.InitialOptions = {
  clearMocks: true,
  resetMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*"],
  coverageDirectory: "coverage",
  modulePathIgnorePatterns: ["dist", "node_modules"],
  setupFilesAfterEnv: ["jest-extended"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  }
};

export default config;

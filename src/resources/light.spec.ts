import { Light } from "./light";
import { Client } from "../client";
import { mock } from "jest-mock-extended";

describe("light", () => {
  describe("reload", () => {
    it("calls get with the path", async () => {
      const mockClient = mock<Client>();
      const light = new Light("1", mock(), mockClient);

      await light.reload();

      expect(mockClient.get).toBeCalledWith("/lights/1");
    });
  });

  describe("on", () => {
    it("calls the client state endpoint with the correct body", async () => {
      const mockClient = mock<Client>();
      const light = new Light("1", mock(), mockClient);

      await light.on();

      expect(mockClient.put).toBeCalledWith("/lights/1/state", { on: true });
    });
  });
});

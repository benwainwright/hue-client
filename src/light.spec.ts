import { Light } from "./light";
import { Client } from "./client";
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
});

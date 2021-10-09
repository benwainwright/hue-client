import { Client } from "../types";
import { Config } from "./config";
import { mock } from "jest-mock-extended";

describe("config", () => {
  describe("setConfig", () => {
    it("calls put on the client resource endpoint with the correct payload", async () => {
      const mockClient = mock<Client>();
      const config = new Config(mock(), mockClient);

      await config.setConfig({ dhcp: true, portalservices: true });

      expect(mockClient.put).toBeCalledWith("/config", {
        dhcp: true,
        portalservices: true
      });
    });
  });

  describe.each`
    method                 | arg      | payload
    ${"setName"}           | ${"ben"} | ${{ name: "ben" }}
    ${"setDhcp"}           | ${true}  | ${{ dhcp: true }}
    ${"setPortalServices"} | ${false} | ${{ portalServices: false }}
    ${"setLinkButton"}     | ${true}  | ${{ linkButton: true }}
  `("$method($arg) ", ({ method, arg, payload }) => {
    it("calls put on the client resource endpoint with the correct payload", async () => {
      const mockClient = mock<Client>();
      const config = new Config(mock(), mockClient);

      await (config as any)[method](arg);

      expect(mockClient.put).toBeCalledWith("/config", payload);
    });
  });
});

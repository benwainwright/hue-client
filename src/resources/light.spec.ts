import { Light } from "./light";
import { Client } from "../types/client";
import { mock } from "jest-mock-extended";
import { LightResponse } from "../types";

describe("light", () => {
  describe("reload", () => {
    it("calls get with the path", async () => {
      const mockClient = mock<Client>();
      const light = new Light("1", mock(), mockClient);

      await light.reload();

      expect(mockClient.get).toBeCalledWith("/lights/1");
    });
  });

  describe.each`
    method           | arg          | state
    ${"on"}          | ${undefined} | ${{ on: true }}
    ${"off"}         | ${undefined} | ${{ on: false }}
    ${"brightness"}  | ${4}         | ${{ bri: 4 }}
    ${"hue"}         | ${6}         | ${{ hue: 6 }}
    ${"saturation"}  | ${2}         | ${{ sat: 2 }}
    ${"flashOnce"}   | ${undefined} | ${{ alert: "select" }}
    ${"flashRepeat"} | ${undefined} | ${{ alert: "lselect" }}
  `("$method($arg) ", ({ method, arg, state }) => {
    it("calls the client state endpoint with the correct state", async () => {
      const mockClient = mock<Client>();
      const light = new Light("1", mock(), mockClient);

      await (light as any)[method](arg);

      expect(mockClient.put).toBeCalledWith("/lights/1/state", state);
    });
  });

  describe("name", () => {
    it("forwards the name from the state", () => {
      const mockResponse = mock<LightResponse>();
      mockResponse.name = "foo";
      const mockClient = mock<Client>();
      const light = new Light("1", mockResponse, mockClient);

      expect(light.name).toEqual("foo");
    });
  });

  describe("state", () => {
    it("forwards the state", () => {
      const mockResponse = mock<LightResponse>();
      const mockClient = mock<Client>();
      const light = new Light("1", mockResponse, mockClient);

      expect(light.state).toEqual(mockResponse.state);
    });
  });

  describe("response", () => {
    it("forwards the response", () => {
      const mockResponse = mock<LightResponse>();
      const mockClient = mock<Client>();
      const light = new Light("1", mockResponse, mockClient);

      expect(light.response).toEqual(mockResponse);
    });
  });
});

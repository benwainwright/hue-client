import { mock } from "jest-mock-extended";
import { when } from "jest-when";
import { Bridge } from "./bridge";
import { BridgeConfig, Client, SceneResponse, LightResponse } from "./types";

describe("bridge", () => {
  describe("username", () => {
    it("forwards the username provided by the clientConfig", () => {
      const mockClient = mock<Client>();

      const bridge = new Bridge(mockClient, { username: "foo" });
      expect(bridge.username).toEqual("foo");
    });
  });

  describe("config", () => {
    it("constructs a config object from the results of a client request to /config", async () => {
      const mockClient = mock<Client>();

      const bridge = new Bridge(mockClient, {});

      const mockBridgeConfig = mock<BridgeConfig>();

      when(mockClient.get)
        .calledWith("/config")
        .mockResolvedValue(mockBridgeConfig);

      const config = await bridge.config();

      expect(config.response).toEqual(mockBridgeConfig);
    });
  });

  describe("scenes", () => {
    it("constructs a set of responses that is constructed from the responses to a get to /scenes", async () => {
      const mockClient = mock<Client>();

      const bridge = new Bridge(mockClient, {});

      const mockScene1 = mock<SceneResponse>();
      const mockScene2 = mock<SceneResponse>();

      const response = {
        "1": mockScene1,
        "2": mockScene2
      };

      when(mockClient.get).calledWith("/scenes").mockResolvedValue(response);

      const scenes = await bridge.scenes();

      expect(scenes).toHaveLength(2);
      expect(scenes[0].response).toEqual(mockScene1);
      expect(scenes[1].response).toEqual(mockScene2);
    });
  });

  describe("lights", () => {
    it("constructs a set of responses that is constructed from the responses to a get to /lights the first time", async () => {
      const mockClient = mock<Client>();

      const bridge = new Bridge(mockClient, {});

      const mockLight1 = mock<LightResponse>();
      const mockLight2 = mock<LightResponse>();

      const response = {
        "1": mockLight1,
        "2": mockLight2
      };

      when(mockClient.get).calledWith("/lights").mockResolvedValue(response);

      const lights = await bridge.lights();

      expect(lights).toHaveLength(2);
      expect(lights[0].response).toEqual(mockLight1);
      expect(lights[1].response).toEqual(mockLight2);
    });

    it("adds responses from /lights/new to responses from /lights the second time", async () => {
      const mockClient = mock<Client>();

      const bridge = new Bridge(mockClient, {});

      const mockLight1 = mock<LightResponse>();
      const mockLight2 = mock<LightResponse>();

      const response1 = {
        "1": mockLight1,
        "2": mockLight2
      };

      when(mockClient.get).calledWith("/lights").mockResolvedValue(response1);

      const mockLight3 = mock<LightResponse>();
      const mockLight4 = mock<LightResponse>();

      const response2 = {
        "1": mockLight3,
        "2": mockLight4
      };

      const lightsFirst = await bridge.lights();
      expect(lightsFirst).toHaveLength(2);

      when(mockClient.get)
        .calledWith("/lights/new")
        .mockResolvedValue(response2);

      const lightsSecond = await bridge.lights();
      expect(lightsSecond).toHaveLength(4);

      expect(lightsSecond[0].response).toEqual(mockLight1);
      expect(lightsSecond[1].response).toEqual(mockLight2);
      expect(lightsSecond[2].response).toEqual(mockLight3);
      expect(lightsSecond[3].response).toEqual(mockLight4);
    });
  });
});

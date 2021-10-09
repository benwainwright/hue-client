import nock from "nock";

import { BridgeLocator } from "./bridge-locator";
import { when } from "jest-when";
import { LightResponse, BridgeConfig } from "./types";
import { getServiceIpWithBonjour } from "./utils";
import { mock } from "jest-mock-extended";
import { Light, Config } from "./resources";

jest.mock("./utils");

beforeEach(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
  nock.enableNetConnect();
});

describe("bridge locator", () => {
  describe("local", () => {
    it("returns a bridge that makes requests to the ip address supplied by bonjour and constructs lights from the response", async () => {
      const bridge = nock("http://123.123.123.123");

      const config = {
        deviceType: "foo-device",
        username: "foo-username"
      };

      when(getServiceIpWithBonjour)
        .calledWith("hue")
        .mockResolvedValue("123.123.123.123");

      const lightOne = mock<LightResponse>();
      lightOne.name = "thing";

      const lightTwo = mock<LightResponse>();
      lightTwo.name = "other";

      const result = {
        foo: { name: "thing" },
        bar: { name: "bar" }
      };

      bridge.get(`/api/foo-username/lights`).reply(200, result);

      const foundBridge = await BridgeLocator.local(config);

      const response = await foundBridge.lights();

      expect(response).toHaveLength(2);

      expect(response[0]).toBeInstanceOf(Light);
      expect(response[0].response).toEqual(result.foo);

      expect(response[1]).toBeInstanceOf(Light);
      expect(response[1].response).toEqual(result.bar);
    });
  });
});

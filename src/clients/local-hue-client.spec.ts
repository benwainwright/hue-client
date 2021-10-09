import { DEFAULT_DEVICE_TYPE, LocalHueClient } from "./local-hue-client";
import nock from "nock";

beforeEach(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
  nock.enableNetConnect();
});

describe("the hue client", () => {
  describe.each`
    method
    ${"get"}
    ${"put"}
    ${"post"}
  `("$method", ({ method }) => {
    it("rejects the promise if an error is returned from the username request", async () => {
      const bridge = nock("http://123.123.123.123");

      bridge.post("/api", `{"devicetype":"foo-type"}`).reply(200, [
        {
          error: {
            type: 5,
            address: "foo",
            description: "bar"
          }
        }
      ]);

      const client = new LocalHueClient("123.123.123.123", "foo-type");

      await expect((client as any)[method]("/foo-bar")).rejects.toThrow(
        new Error("Gateway returned error response [5:foo]: bar")
      );
    });

    it("if a username is passed in it makes the call without generating a new username", async () => {
      const testUsername = "foo-username";

      const bridge = nock("http://123.123.123.123");

      const expectedResult = { foo: "bar" };

      (bridge as any)
        [method](`/api/${testUsername}/foo-bar`)
        .reply(200, expectedResult);

      const client = new LocalHueClient(
        "123.123.123.123",
        "foo-type",
        testUsername
      );

      const actual = await (client as any)[method]("/foo-bar");

      expect(actual).toEqual(expectedResult);
    });

    it("if no devicetype is passed in, it uses the default one for the username request", async () => {
      const testUsername = "foo-username";

      const bridge = nock("http://123.123.123.123");

      bridge
        .post("/api", `{"devicetype":"${DEFAULT_DEVICE_TYPE}"}`)
        .reply(200, [
          {
            success: {
              username: testUsername
            }
          }
        ]);

      const expectedResult = { foo: "bar" };

      (bridge as any)
        [method](`/api/${testUsername}/foo-bar`)
        .reply(200, expectedResult);

      const client = new LocalHueClient("123.123.123.123");

      const actual = await (client as any)[method]("/foo-bar");

      expect(actual).toEqual(expectedResult);
    });

    it("if no username is passed in, it gets one from the bridge and uses it in the request, then returns the response", async () => {
      const testUsername = "foo-username";

      const bridge = nock("http://123.123.123.123");

      bridge.post("/api", `{"devicetype":"foo-type"}`).reply(200, [
        {
          success: {
            username: testUsername
          }
        }
      ]);

      const expectedResult = { foo: "bar" };

      (bridge as any)
        [method](`/api/${testUsername}/foo-bar`)
        .reply(200, expectedResult);

      const client = new LocalHueClient("123.123.123.123", "foo-type");

      const actual = await (client as any)[method]("/foo-bar");

      expect(actual).toEqual(expectedResult);
    });

    it("if the error address is empty, it changes the error string appropriately", async () => {
      const testUsername = "foo-username";

      const bridge = nock("http://123.123.123.123");

      bridge.post("/api", `{"devicetype":"foo-type"}`).reply(200, [
        {
          success: {
            username: testUsername
          }
        }
      ]);

      (bridge as any)[method](`/api/${testUsername}/foo-bar`).reply(200, [
        {
          error: {
            type: 5,
            description: "bar"
          }
        }
      ]);

      const client = new LocalHueClient("123.123.123.123", "foo-type");

      await expect((client as any)[method]("/foo-bar")).rejects.toThrow(
        new Error("Gateway returned error response [5]: bar")
      );
    });

    it("rejects the promise if an error is returned from the method response", async () => {
      const testUsername = "foo-username";

      const bridge = nock("http://123.123.123.123");

      bridge.post("/api", `{"devicetype":"foo-type"}`).reply(200, [
        {
          success: {
            username: testUsername
          }
        }
      ]);

      (bridge as any)[method](`/api/${testUsername}/foo-bar`).reply(200, [
        {
          error: {
            type: 5,
            address: "foo",
            description: "bar"
          }
        }
      ]);

      const client = new LocalHueClient("123.123.123.123", "foo-type");

      await expect((client as any)[method]("/foo-bar")).rejects.toThrow(
        new Error("Gateway returned error response [5:foo]: bar")
      );
    });
  });
});

import { LocalHueClient } from "./local-hue-client";
import nock from "nock";

beforeEach(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
  nock.enableNetConnect();
});

describe("the hue client", () => {
  describe("get", () => {
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

      await expect(client.get("/foo-bar")).rejects.toThrow(
        new Error("Gateway returned error response [5:foo]: bar")
      );
    });

    it("if no password is passed in, it gets one from the bridge and uses it in the request, then returns the response", async () => {
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

      bridge.get(`/api/${testUsername}/foo-bar`).reply(200, expectedResult);

      const client = new LocalHueClient("123.123.123.123", "foo-type");

      const actual = await client.get("/foo-bar");

      expect(actual).toEqual(expectedResult);
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

      bridge.get(`/api/${testUsername}/foo-bar`).reply(200, [
        {
          error: {
            type: 5,
            address: "foo",
            description: "bar"
          }
        }
      ]);

      const client = new LocalHueClient("123.123.123.123", "foo-type");

      await expect(client.get("/foo-bar")).rejects.toThrow(
        new Error("Gateway returned error response [5:foo]: bar")
      );
    });
  });

  describe("put", () => {
    it("if no password is passed in, it gets one from the bridge and uses it in the request, then returns the response", async () => {
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

      bridge
        .put(`/api/${testUsername}/foo-bar`, { foo: "bar" })
        .reply(200, expectedResult);

      const client = new LocalHueClient("123.123.123.123", "foo-type");

      const actual = await client.put("/foo-bar", { foo: "bar" });

      expect(actual).toEqual(expectedResult);
    });

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

      await expect(client.put("/foo-bar", { foo: "bar" })).rejects.toThrow(
        new Error("Gateway returned error response [5:foo]: bar")
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

      bridge.put(`/api/${testUsername}/foo-bar`).reply(200, [
        {
          error: {
            type: 5,
            address: "foo",
            description: "bar"
          }
        }
      ]);

      const client = new LocalHueClient("123.123.123.123", "foo-type");

      await expect(client.put("/foo-bar", { foo: "bar" })).rejects.toThrow(
        new Error("Gateway returned error response [5:foo]: bar")
      );
    });
  });

  describe("post", () => {
    it("if no password is passed in, it gets one from the bridge and uses it in the request, then returns the response", async () => {
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

      bridge
        .post(`/api/${testUsername}/foo-bar`, { foo: "bar" })
        .reply(200, expectedResult);

      const client = new LocalHueClient("123.123.123.123", "foo-type");

      const actual = await client.post("/foo-bar", { foo: "bar" });

      expect(actual).toEqual(expectedResult);
    });

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

      await expect(client.post("/foo-bar", { foo: "bar" })).rejects.toThrow(
        new Error("Gateway returned error response [5:foo]: bar")
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

      bridge.post(`/api/${testUsername}/foo-bar`).reply(200, [
        {
          error: {
            type: 5,
            address: "foo",
            description: "bar"
          }
        }
      ]);

      const client = new LocalHueClient("123.123.123.123", "foo-type");

      await expect(client.post("/foo-bar", { foo: "bar" })).rejects.toThrow(
        new Error("Gateway returned error response [5:foo]: bar")
      );
    });
  });
});
import { getServiceIpWithBonjour } from "./get-service-ip-with-bonjour";
import { mocked } from "ts-jest/utils";
import { mock } from "jest-mock-extended";
import bonjour, { Bonjour, RemoteService } from "bonjour";

jest.mock("bonjour");

afterEach(() => {
  jest.useRealTimers();
});

const flushPromises = () => new Promise(resolve => setImmediate(resolve));

describe("get service ip with bonjour", () => {
  it("destroys bonjour when the ip is found", async () => {
    const mockBonjourClient = mock<Bonjour>();
    mocked(bonjour).mockReturnValue(mockBonjourClient);

    mockBonjourClient.find.mockImplementation((service, callback) => {
      const mockService = mock<RemoteService>();
      mockService.addresses = ["456.456.456.456"];
      if (service.type === "foo") {
        callback?.(mockService);
      }
      return mock();
    });

    await getServiceIpWithBonjour("foo");

    expect(mockBonjourClient.destroy).toHaveBeenCalled();
  });

  it("rejects the promise after 2 seconds if no bridge is found", async () => {
    jest.useFakeTimers("legacy");

    const mockBonjourClient = mock<Bonjour>();
    mocked(bonjour).mockReturnValue(mockBonjourClient);

    mockBonjourClient.find.mockResolvedValue(mock());
    const resolveSpy = jest.fn();
    const catchSpy = jest.fn();

    getServiceIpWithBonjour("foo").then(resolveSpy).catch(catchSpy);

    jest.advanceTimersByTime(1000);
    await flushPromises();

    expect(resolveSpy).not.toHaveBeenCalled();
    expect(catchSpy).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1001);
    await flushPromises();

    expect(resolveSpy).not.toHaveBeenCalled();
    expect(catchSpy).toHaveBeenCalled();
  });

  it("destroys bonjour if no promise is found", async () => {
    jest.useFakeTimers("legacy");

    const mockBonjourClient = mock<Bonjour>();
    mocked(bonjour).mockReturnValue(mockBonjourClient);

    mockBonjourClient.find.mockResolvedValue(mock());

    getServiceIpWithBonjour("foo").catch(() => {});

    jest.advanceTimersByTime(2050);
    await flushPromises();

    expect(mockBonjourClient.destroy).toHaveBeenCalled();
  });

  it("resolves the promise with the ip address found by bonjour", async () => {
    const mockBonjourClient = mock<Bonjour>();
    mocked(bonjour).mockReturnValue(mockBonjourClient);

    mockBonjourClient.find.mockImplementation((service, callback) => {
      const mockService = mock<RemoteService>();
      mockService.addresses = ["456.456.456.456"];
      if (service.type === "foo") {
        callback?.(mockService);
      }
      return mock();
    });

    const response = await getServiceIpWithBonjour("foo");

    expect(response).toEqual("456.456.456.456");
  });

  it("rejects the promise if the response doesn't contain a valid ip", async () => {
    const mockBonjourClient = mock<Bonjour>();
    mocked(bonjour).mockReturnValue(mockBonjourClient);

    mockBonjourClient.find.mockImplementation((service, callback) => {
      const mockService = mock<RemoteService>();
      mockService.addresses = ["foo", "asd123.asd"];
      if (service.type === "foo") {
        callback?.(mockService);
      }
      return mock();
    });

    await expect(getServiceIpWithBonjour("foo")).rejects.toThrow(
      new Error("Ip was not found in bonjour response")
    );
  });
});

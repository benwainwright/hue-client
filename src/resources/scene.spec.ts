import { Scene } from "./scene";
import { Client } from "../client";
import { mock } from "jest-mock-extended";
import { SceneResponse } from "../types";

describe("scene", () => {
	it("passes the response through and makes it accessible", () => {
		const mockClient = mock<Client>();
		const mockSceneResponse = mock<SceneResponse>();
		const scene = new Scene("1", mockSceneResponse, mockClient);

		expect(scene.response).toEqual(mockSceneResponse);
	});

	it("makes the name available on a property", () => {
		const mockClient = mock<Client>();
		const mockSceneResponse = mock<SceneResponse>();
		mockSceneResponse.name = "foo-bar";
		const scene = new Scene("1", mockSceneResponse, mockClient);

		expect(scene.name).toEqual("foo-bar");
	});
});

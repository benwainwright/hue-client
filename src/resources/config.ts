import { BridgeConfig, UpdateableBridgeConfig } from "../types";
import { Client } from "../client";

export class Config {
	constructor(public response: BridgeConfig, private client: Client) {}

	async setConfig(config: Partial<UpdateableBridgeConfig>) {
		await this.client.put("/config", config);
	}

	async setName(name: string) {
		await this.client.put("/config", { name });
	}

	async setDhcp(dhcp: boolean) {
		await this.client.put("/config", { dhcp });
	}

	async setPortalServices(portalServices: boolean) {
		await this.client.put("/config", { portalServices });
	}

	async setLinkButton(linkButton: boolean) {
		await this.client.put("/config", { linkButton });
	}
}

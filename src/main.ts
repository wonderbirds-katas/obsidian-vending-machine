import { App, Modal, Plugin } from "obsidian";
import { Display } from "./display";
import { VendingMachine } from "./vendingMachine";

export default class VendingMachinePlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: "open-vending-machine",
			name: "Open Vending Machine",
			callback: () => {
				new VendingMachineDialog(this.app).open();
			},
		});
	}
}

export class VendingMachineDialog extends Modal {
	private _display: Display;
	private _vendingMachine: VendingMachine = new VendingMachine(new Display());

	constructor(app: App) {
		super(app);

		this._display = new Display();
		this._vendingMachine = new VendingMachine(this._display);
	}

	onOpen() {
		const { contentEl, titleEl } = this;
		titleEl.setText("Vending Machine");

		this._display.bindToParent(contentEl);
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
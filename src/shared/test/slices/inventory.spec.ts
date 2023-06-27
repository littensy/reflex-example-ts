/// <reference types="@rbxts/testez/globals" />

import { defaultPlayerData, inventorySlice } from "shared/slices/players";

export = () => {
	const getInventory = () => {
		return inventorySlice.getState().__test__;
	};

	beforeEach(() => {
		inventorySlice.loadPlayerData("__test__", defaultPlayerData);
	});

	afterEach(() => {
		inventorySlice.resetState();
	});

	it("should load player data", () => {
		const inventory = getInventory();
		expect(inventory).to.be.a("table");
		expect(inventory?.pets).to.be.a("table");
	});

	it("should add a pet", () => {
		inventorySlice.addPet("__test__", "cat");
		const inventory = getInventory();
		expect(inventory?.pets[0]).to.be.a("table");
		expect(inventory?.pets[0].id).to.equal("cat");
		expect(inventory?.pets[0].equipped).to.be.a("boolean");
	});

	it("should remove a pet", () => {
		inventorySlice.addPet("__test__", "cat");
		inventorySlice.removePet("__test__", "cat");
		const inventory = getInventory();
		expect(inventory?.pets[0]).to.never.be.ok();
	});

	it("should toggle a pet's equipped state", () => {
		inventorySlice.addPet("__test__", "cat");
		const inventoryBefore = getInventory();
		inventorySlice.togglePetEquipped("__test__", "cat");
		const inventoryAfter = getInventory();
		expect(inventoryAfter?.pets[0]).to.be.ok();
		expect(inventoryAfter?.pets[0].equipped).to.equal(!inventoryBefore?.pets[0].equipped);
	});
};

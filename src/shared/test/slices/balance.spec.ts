/// <reference types="@rbxts/testez/globals" />

import { balanceSlice, defaultPlayerData } from "shared/slices/players";

export = () => {
	const getBalance = () => {
		return balanceSlice.getState().__test__;
	};

	beforeEach(() => {
		balanceSlice.loadPlayerData("__test__", defaultPlayerData);
	});

	afterEach(() => {
		balanceSlice.resetState();
	});

	it("should load player data", () => {
		const balance = getBalance();
		expect(balance).to.be.a("table");
		expect(balance?.coins).to.equal(defaultPlayerData.balance.coins);
		expect(balance?.gems).to.equal(defaultPlayerData.balance.gems);
	});

	it("should update the balance", () => {
		balanceSlice.changeBalance("__test__", "coins", -5);
		balanceSlice.changeBalance("__test__", "gems", 5);
		const balance = getBalance();
		expect(balance?.coins).to.equal(defaultPlayerData.balance.coins - 5);
		expect(balance?.gems).to.equal(defaultPlayerData.balance.gems + 5);
	});
};

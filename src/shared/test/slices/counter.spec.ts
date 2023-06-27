/// <reference types="@rbxts/testez/globals" />

import { counterSlice } from "shared/slices/counter";

export = () => {
	const getCount = () => {
		return counterSlice.getState().count;
	};

	afterEach(() => {
		counterSlice.resetState();
	});

	it("should increment the count", () => {
		counterSlice.incrementCount();
		expect(getCount()).to.equal(1);
	});

	it("should decrement the count", () => {
		counterSlice.decrementCount();
		expect(getCount()).to.equal(-1);
	});
};

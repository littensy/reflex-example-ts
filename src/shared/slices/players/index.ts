import { combineProducers } from "@rbxts/reflex";
import { balanceSlice } from "./balance";
import { inventorySlice } from "./inventory";

export * from "./balance";
export * from "./inventory";
export * from "./types";
export * from "./utils";

export const playersSlice = combineProducers({
	balance: balanceSlice,
	inventory: inventorySlice,
});

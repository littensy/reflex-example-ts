import { CombineStates } from "@rbxts/reflex";
import { counterSlice } from "./counter";
import { playersSlice } from "./players";

export type SharedState = CombineStates<typeof slices>;

export const slices = {
	players: playersSlice,
	counter: counterSlice,
};

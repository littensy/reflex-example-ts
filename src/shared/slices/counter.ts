import { createProducer } from "@rbxts/reflex";

export interface CounterState {
	readonly count: number;
}

const initialState: CounterState = {
	count: 0,
};

export const counterSlice = createProducer(initialState, {
	incrementCount: (state) => ({
		...state,
		count: state.count + 1,
	}),

	decrementCount: (state) => ({
		...state,
		count: state.count - 1,
	}),
});

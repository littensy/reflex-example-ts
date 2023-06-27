import { SharedState } from "shared/slices";

export const selectCount = (state: SharedState) => {
	return state.counter.count;
};

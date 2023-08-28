import { InferState, combineProducers, loggerMiddleware } from "@rbxts/reflex";
import { slices } from "shared/slices";
import { receiverMiddleware } from "./middleware/receiver";

export type RootState = InferState<typeof store>;

export const store = combineProducers({
	...slices,
});

store.applyMiddleware(receiverMiddleware(), loggerMiddleware);

import { createBroadcastReceiver } from "@rbxts/reflex";
import { client } from "shared/remotes";
import { store } from "./";

const requestState = client.Get("requestState");

const receiver = createBroadcastReceiver({
	requestState: () => {
		return requestState.CallServerAsync();
	},
});

client.OnEvent("broadcast", (actions) => {
	receiver.dispatch(actions);
});

store.applyMiddleware(receiver.middleware);

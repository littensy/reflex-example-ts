import { createBroadcastReceiver } from "@rbxts/reflex";
import { client } from "shared/remotes";

export function receiverMiddleware() {
	const receiver = createBroadcastReceiver({
		start: async () => {
			return client.Get("start").SendToServer();
		},
	});

	client.OnEvent("broadcast", (actions) => {
		receiver.dispatch(actions);
	});

	return receiver.middleware;
}

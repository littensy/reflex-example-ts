import { createBroadcaster } from "@rbxts/reflex";
import { server } from "shared/remotes";
import { slices } from "shared/slices";

export function broadcasterMiddleware() {
	const broadcaster = createBroadcaster({
		producers: slices,
		dispatch: async (player, actions) => {
			server.Get("broadcast").SendToPlayer(player, actions);
		},
	});

	server.OnEvent("start", (player) => {
		return broadcaster.start(player);
	});

	return broadcaster.middleware;
}

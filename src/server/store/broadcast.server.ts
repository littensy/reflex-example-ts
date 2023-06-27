import { createBroadcaster } from "@rbxts/reflex";
import { server } from "shared/remotes";
import { slices } from "shared/slices";
import { store } from "./";

const broadcast = server.Get("broadcast");

const broadcaster = createBroadcaster({
	producers: slices,
	broadcast: (players, actions) => {
		broadcast.SendToPlayers(players, actions);
	},
});

server.OnFunction("requestState", (player) => {
	return broadcaster.playerRequestedState(player);
});

store.applyMiddleware(broadcaster.middleware);

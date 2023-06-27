import Net from "@rbxts/net";
import { BroadcastAction } from "@rbxts/reflex";
import { SharedState } from "./slices";

export const { Client: client, Server: server } = Net.CreateDefinitions({
	broadcast: Net.Definitions.ServerToClientEvent<[actions: BroadcastAction[]]>(),
	requestState: Net.Definitions.ServerAsyncFunction<() => SharedState>(),
});

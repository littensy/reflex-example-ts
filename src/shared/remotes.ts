import Net from "@rbxts/net";
import { BroadcastAction } from "@rbxts/reflex";

export const { Client: client, Server: server } = Net.CreateDefinitions({
	broadcast: Net.Definitions.ServerToClientEvent<[actions: BroadcastAction[]]>(),
	start: Net.Definitions.ClientToServerEvent(),
});

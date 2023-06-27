import { createCollection } from "@rbxts/lapis";
import { Players } from "@rbxts/services";
import { store } from "server/store";
import { selectPlayerData } from "shared/selectors";
import { PlayerData, defaultPlayerData } from "shared/slices/players";
import { validate } from "./validate";

// Required to allow interfaces to be used as the collection type
type PlayerDataSchema = PlayerData & Record<string, any>;

const collection = createCollection<PlayerDataSchema>("data-v1", {
	defaultData: defaultPlayerData,
	validate: validate,
});

async function loadDefaultData(player: Player) {
	store.loadPlayerData(player.Name, defaultPlayerData);

	Promise.fromEvent(Players.PlayerRemoving, (p) => p === player).then(() => {
		store.closePlayerData(player.Name);
	});
}

async function loadPlayerData(player: Player) {
	if (player.UserId < 0) {
		// Lapis session locking may break in local test servers, which use
		// negative user IDs, so we just load the default data instead.
		return loadDefaultData(player);
	}

	try {
		const document = await collection.load(`${player.UserId}`);

		if (!player.IsDescendantOf(Players)) {
			return;
		}

		const unsubscribe = store.subscribe(selectPlayerData(player.Name), (data) => {
			if (data) document.write(data);
		});

		Promise.fromEvent(Players.PlayerRemoving, (p) => p === player).then(() => {
			document.close();
			unsubscribe();
			store.closePlayerData(player.Name);
		});

		store.loadPlayerData(player.Name, document.read());
	} catch (err) {
		warn(`Failed to load data for ${player.Name}: ${err}`);
		loadDefaultData(player);
	}
}

Players.PlayerAdded.Connect((player) => {
	loadPlayerData(player);
});

for (const player of Players.GetPlayers()) {
	loadPlayerData(player);
}

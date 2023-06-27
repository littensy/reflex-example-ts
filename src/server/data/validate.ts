import { t } from "@rbxts/t";
import { PlayerData } from "shared/slices/players";

export const validate: t.check<PlayerData> = t.strictInterface({
	balance: t.strictInterface({
		coins: t.number,
		gems: t.number,
	}),
	inventory: t.strictInterface({
		pets: t.array(
			t.strictInterface({
				id: t.string,
				equipped: t.boolean,
			}),
		),
	}),
});

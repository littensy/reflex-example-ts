import { createSelector } from "@rbxts/reflex";
import { SharedState } from "shared/slices";
import { PlayerData } from "shared/slices/players";

export const selectPlayerBalance = (playerId: string) => {
	return (state: SharedState) => {
		return state.players.balance[playerId];
	};
};

export const selectPlayerInventory = (playerId: string) => {
	return (state: SharedState) => {
		return state.players.inventory[playerId];
	};
};

export const selectPlayerData = (playerId: string) => {
	return createSelector(
		[selectPlayerBalance(playerId), selectPlayerInventory(playerId)] as const,
		(balance, inventory): PlayerData | undefined => {
			if (balance && inventory) {
				return { balance, inventory };
			}
		},
	);
};

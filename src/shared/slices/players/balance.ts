import { createProducer } from "@rbxts/reflex";
import { PlayerBalance, PlayerBalanceType, PlayerData } from "./types";

export interface BalanceState {
	readonly [player: string]: PlayerBalance | undefined;
}

const initialState: BalanceState = {};

export const balanceSlice = createProducer(initialState, {
	loadPlayerData: (state, player: string, data: PlayerData) => ({
		...state,
		[player]: data.balance,
	}),

	closePlayerData: (state, player: string) => ({
		...state,
		[player]: undefined,
	}),

	changeBalance: (state, player: string, balanceType: PlayerBalanceType, amount: number) => {
		const balance = state[player];

		return {
			...state,
			[player]: balance && {
				...balance,
				[balanceType]: balance[balanceType] + amount,
			},
		};
	},
});

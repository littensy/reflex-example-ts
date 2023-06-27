import { createProducer } from "@rbxts/reflex";
import { PlayerData, PlayerInventory } from "./types";

export interface InventoryState {
	readonly [player: string]: PlayerInventory | undefined;
}

const initialState: InventoryState = {};

export const inventorySlice = createProducer(initialState, {
	loadPlayerData: (state, player: string, data: PlayerData) => ({
		...state,
		[player]: data.inventory,
	}),

	closePlayerData: (state, player: string) => ({
		...state,
		[player]: undefined,
	}),

	addPet: (state, player: string, petId: string) => {
		const inventory = state[player];

		return {
			...state,
			[player]: inventory && {
				...inventory,
				pets: [...inventory.pets, { id: petId, equipped: false }],
			},
		};
	},

	removePet: (state, player: string, petId: string) => {
		const inventory = state[player];

		return {
			...state,
			[player]: inventory && {
				...inventory,
				pets: inventory.pets.filter((pet) => pet.id !== petId),
			},
		};
	},

	togglePetEquipped: (state, player: string, petId: string) => {
		const inventory = state[player];

		return {
			...state,
			[player]: inventory && {
				...inventory,
				pets: inventory.pets.map((pet) => {
					if (pet.id !== petId) {
						return pet;
					}
					return { ...pet, equipped: !pet.equipped };
				}),
			},
		};
	},
});

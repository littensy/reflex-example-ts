export interface PlayerData {
	readonly balance: PlayerBalance;
	readonly inventory: PlayerInventory;
}

export interface PlayerBalance {
	readonly gems: number;
	readonly coins: number;
}

export type PlayerBalanceType = keyof PlayerBalance;

export interface PlayerInventory {
	readonly pets: readonly PlayerInventoryPet[];
}

export interface PlayerInventoryPet {
	readonly id: string;
	readonly equipped: boolean;
}

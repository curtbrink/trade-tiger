import { defineStore } from 'pinia';
import { Ship } from '@/api/ship/ship.model';
import shipApi from '@/api/ship/ship.api';
import { iteratePagedData } from '@/api/misc.types';

export const useShipStore = defineStore('ship', {
  state: () => ({
    ships: [] as Ship[],
    selectedShip: undefined as Ship | undefined,
  }),
  actions: {
    async getAllShips() {
      this.ships = await iteratePagedData(shipApi.getMyShips);
      this.selectedShip = this.ships[0] || undefined;
    },
    async ensureLoaded() {
      if (this.ships.length) {
        return Promise.resolve();
      }
      return this.getAllShips();
    },
    async selectShip(shipName: string) {
      this.selectedShip = this.ships.find(
        (it) => it.registration.name === shipName,
      );
    },
  },
  getters: {
    totalShips: (state) => state.ships.length,
    currentSystem(): string | undefined {
      return this.selectedShip?.nav.systemSymbol;
    },
    currentWaypoint(): string | undefined {
      return this.selectedShip?.nav.waypointSymbol;
    },
  },
});

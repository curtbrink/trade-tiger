import { defineStore } from 'pinia';
import { Ship } from '@/api/ship/ship.model';
import shipApi from '@/api/ship/ship.api';
import { iteratePagedData } from '@/api/misc.types';

export const useShipStore = defineStore('ship', {
  state: () => ({
    ships: [] as Ship[],
  }),
  actions: {
    async getAllShips() {
      this.ships = await iteratePagedData(shipApi.getMyShips);
    },
    async ensureLoaded() {
      if (this.ships.length) {
        return Promise.resolve();
      }
      return this.getAllShips();
    },
  },
  getters: {
    totalShips: (state) => state.ships.length,
  },
});

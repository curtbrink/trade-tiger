import { defineStore } from 'pinia';
import { Ship } from '@/api/ship/ship.model';
import shipApi from '@/api/ship/ship.api';
import { Paging } from '@/api/misc.types';

export const useShipStore = defineStore('ship', {
  state: () => ({
    ships: [] as Ship[],
    shipPaging: undefined as Paging | undefined,
  }),
  actions: {
    async ensureLoaded() {
      if (this.ships.length) {
        return Promise.resolve();
      }
      const shipsResponse = await shipApi.getMyShips();
      this.ships.push(...shipsResponse.data);
      this.shipPaging = shipsResponse.meta;
    },
  },
  getters: {
    totalShips: (state) => state.shipPaging?.total || 0,
  },
});

import { defineStore } from 'pinia';
import { Ship } from '@/api/ship/ship.model';

export const useShipStore = defineStore('ship', {
  state: () => ({
    ship: undefined as Ship | undefined,
  }),
  actions: {},
});

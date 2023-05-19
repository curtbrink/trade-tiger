import { defineStore } from 'pinia';
import { Ship, ShipNavigation } from '@/api/ship/ship.model';
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
    async selectShip(symbol: string) {
      this.selectedShip =
        this.ships.find((it) => it.symbol === symbol) || this.ships[0];
    },
    async dockShip(symbol: string) {
      const response = await shipApi.dockShip(symbol);
      await this.patchNav(symbol, response.data.nav);
    },
    async orbitShip(symbol: string) {
      const response = await shipApi.orbitShip(symbol);
      await this.patchNav(symbol, response.data.nav);
    },
    async patchNav(shipSymbol: string, newNav: ShipNavigation) {
      const ship = this.ships.find((it) => it.symbol === shipSymbol);
      if (!ship) {
        const selectedShipSymbol = this.selectedShip?.symbol;
        await this.reloadAndSelect(selectedShipSymbol);
      } else {
        ship.nav = newNav;
      }
    },
    async reloadAndSelect(shipSymbol?: string) {
      await this.getAllShips();
      if (shipSymbol) {
        await this.selectShip(shipSymbol);
      }
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

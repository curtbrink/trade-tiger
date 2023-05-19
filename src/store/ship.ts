import { defineStore } from 'pinia';
import {
  Ship,
  ShipFuel,
  ShipNavigation,
  ShipNavigationStatus,
} from '@/api/ship/ship.model';
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
    async navigateSelectedShip(waypoint: string) {
      if (
        !this.selectedShip ||
        this.selectedShip.nav.status === ShipNavigationStatus.InTransit
      ) {
        return;
      }
      if (this.selectedShip.nav.status !== ShipNavigationStatus.InOrbit) {
        await this.orbitShip(this.selectedShip.symbol);
      }
      const navigationResponse = await shipApi.navigateShip(
        this.selectedShip.symbol,
        waypoint,
      );
      const { nav, fuel } = navigationResponse.data;
      await this.patchNav(this.selectedShip.symbol, nav);
      await this.patchFuel(this.selectedShip.symbol, fuel);
    },
    async patchNav(shipSymbol: string, newNav: ShipNavigation) {
      await this.patchShipProperty(shipSymbol, 'nav', newNav);
    },
    async patchFuel(shipSymbol: string, newFuel: ShipFuel) {
      await this.patchShipProperty(shipSymbol, 'fuel', newFuel);
    },
    async patchShipProperty(symbol: string, prop: string, val: any) {
      const ship = this.ships.find((it) => it.symbol === symbol);
      if (!ship) {
        const selectedShipSymbol = this.selectedShip?.symbol;
        await this.reloadAndSelect(selectedShipSymbol);
      } else {
        // @ts-ignore
        ship[prop] = val;
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

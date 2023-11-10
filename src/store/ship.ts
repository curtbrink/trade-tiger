import { defineStore } from 'pinia';
import {
  Ship,
  ShipCargo,
  ShipCooldown,
  ShipFuel,
  ShipNavigation,
  ShipNavigationStatus,
} from '@/api/models/ship.model';
import shipApi from '@/api/api/ship/ship.api';
import { iteratePagedData } from '@/api/models/misc.types';
import { useCurrentLocationStore } from '@/store/current-location';
import { useAgentStore } from '@/store/agent';
import browserStorageService from '@/services/browser-storage.service';
import { useSnackbar } from '@/store/snackbar';

export const useShipStore = defineStore('ship', {
  state: () => ({
    ships: [] as Ship[],
    selectedShip: undefined as Ship | undefined,
  }),
  actions: {
    async getAllShips() {
      this.ships = await iteratePagedData(shipApi.getMyShips);
      await this.selectShip();
    },
    async ensureLoaded() {
      if (!this.selectedShip) {
        if (!this.ships.length) {
          return this.getAllShips();
        } else {
          return this.selectShip();
        }
      }
      return;
    },
    async selectShip(symbol?: string) {
      const shipIdToFind =
        symbol ?? browserStorageService.getSelectedShip() ?? '';
      const foundShip = this.ships.find((it) => it.symbol === shipIdToFind);

      this.selectedShip = foundShip ? foundShip : this.ships[0];

      browserStorageService.setSelectedShip(this.selectedShip.symbol);

      const currentLocationStore = useCurrentLocationStore();
      await currentLocationStore.updateCurrentLocation(this.selectedShip.nav);
    },
    async addShip(ship: Ship) {
      this.ships.push(ship);
    },
    async dockShip(symbol: string) {
      const response = await shipApi.dockShip(symbol);
      await this.patchNav(symbol, response.data.nav);

      const snackbar = useSnackbar();
      snackbar.showError('you just docked the ship!');
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

      const currentLocationStore = useCurrentLocationStore();
      await currentLocationStore.updateCurrentLocation(nav);
    },
    async refreshNav(shipSymbol: string) {
      console.log('refreshNav');
      const response = await shipApi.refreshShipNav(shipSymbol);
      const ship = this.ships.find((it) => it.symbol === shipSymbol);
      if (ship) {
        ship.nav = response.data;
      }
    },
    async refuelShip(shipSymbol: string) {
      const response = await shipApi.refuelShip(shipSymbol);
      const agentStore = useAgentStore();
      agentStore.setAgent(response.data.agent);
      await this.patchFuel(shipSymbol, response.data.fuel);
    },
    async extractResources(shipSymbol: string) {
      const response = await shipApi.extractResources(shipSymbol);
      await this.patchCooldown(shipSymbol, response.data.cooldown);
      await this.patchCargo(shipSymbol, response.data.cargo);
    },
    async patchNav(shipSymbol: string, newNav: ShipNavigation) {
      console.log('patchNav');
      await this.patchShipProperty(shipSymbol, 'nav', newNav);
    },
    async patchFuel(shipSymbol: string, newFuel: ShipFuel) {
      await this.patchShipProperty(shipSymbol, 'fuel', newFuel);
    },
    async patchCooldown(shipSymbol: string, newCooldown: ShipCooldown) {
      await this.patchShipProperty(shipSymbol, 'cooldown', newCooldown);
    },
    async patchCargo(shipSymbol: string, newCargo: ShipCargo) {
      await this.patchShipProperty(shipSymbol, 'cargo', newCargo);
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
  },
});

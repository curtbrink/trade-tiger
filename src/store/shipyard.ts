import { defineStore } from 'pinia';
import waypointApi from '@/api/api/waypoint/waypoint.api';
import { Shipyard, ShipyardShipType } from '@/api/models/shipyard.model';
import { useShipStore } from '@/store/ship';
import shipApi from '@/api/api/ship/ship.api';
import { useAgentStore } from '@/store/agent';

export const useShipyardStore = defineStore('shipyard', {
  state: () => ({
    currentShipyard: undefined as Shipyard | undefined,
  }),
  actions: {
    async getShipyardForWaypoint(systemId: string, waypointId: string) {
      const shipyardResponse = await waypointApi.getShipyardForWaypoint(
        systemId,
        waypointId,
      );
      this.currentShipyard = shipyardResponse.data;
    },
    async ensureLoaded() {
      const shipStore = useShipStore();
      if (
        !shipStore.shipyardAccessible ||
        !shipStore.selectedShip ||
        (this.currentShipyard &&
          shipStore.selectedShip &&
          this.currentShipyard.symbol ===
            shipStore.selectedShip.nav.waypointSymbol)
      ) {
        return;
      }
      await this.getShipyardForWaypoint(
        shipStore.selectedShip.nav.systemSymbol,
        shipStore.selectedShip.nav.waypointSymbol,
      );
    },
    async purchaseShip(shipType: ShipyardShipType) {
      const waypoint = this.currentShipyard!.symbol;
      const purchaseShipResponse = await shipApi.purchaseShip(
        shipType,
        waypoint,
      );
      const { agent, ship } = purchaseShipResponse.data;

      const agentStore = useAgentStore();
      await agentStore.setAgent(agent);
      const shipStore = useShipStore();
      await shipStore.addShip(ship);

      await this.getShipyardForWaypoint(
        shipStore.selectedShip!.nav.systemSymbol,
        shipStore.selectedShip!.nav.waypointSymbol,
      );
    },
  },
  getters: {},
});

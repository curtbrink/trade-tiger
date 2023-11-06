import { defineStore } from 'pinia';
import { iteratePagedData } from '@/api/models/misc.types';
import { Waypoint } from '@/api/models/waypoint.model';
import waypointApi from '@/api/api/waypoint/waypoint.api';
import { useShipStore } from '@/store/ship';

export const useSystemStore = defineStore('system', {
  state: () => ({
    systemWaypoints: [] as Waypoint[],
  }),
  actions: {
    async getWaypointsForSystem(systemId: string) {
      this.systemWaypoints = await iteratePagedData(
        waypointApi.getWaypointCallbackForSystem(systemId),
      );
    },
    async ensureLoaded() {
      const shipStore = useShipStore();
      if (
        this.systemWaypoints.length &&
        shipStore.selectedShip &&
        this.systemWaypoints[0].systemSymbol === shipStore.currentSystem
      ) {
        return;
      }
      await this.getWaypointsForSystem(shipStore.currentSystem!);
    },
  },
  getters: {},
});

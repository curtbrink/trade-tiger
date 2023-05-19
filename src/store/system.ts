import { defineStore } from 'pinia';
import { iteratePagedData } from '@/api/misc.types';
import { Waypoint } from '@/api/waypoint/waypoint.model';
import waypointApi from '@/api/waypoint/waypoint.api';

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
  },
  getters: {},
});

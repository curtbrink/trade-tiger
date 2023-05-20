import spacetradersApi from '@/api/spacetraders.api';
import { PagedResponseData, ResponseData } from '@/api/misc.types';
import { Waypoint } from '@/api/waypoint/waypoint.model';
import { Shipyard } from '@/api/shipyard/shipyard.model';

const waypointApi = {
  getWaypointsForSystem: (system: string, limit: number, page: number) =>
    `systems/${system}/waypoints?page=${page}&limit=${limit}`,
  getShipyardForWaypoint: (system: string, waypoint: string) =>
    `systems/${system}/waypoints/${waypoint}/shipyard`,
};

export default {
  getWaypointCallbackForSystem(
    systemId: string,
  ): (limit: number, page: number) => Promise<PagedResponseData<Waypoint>> {
    const sysId = systemId;
    return (limit, page) => {
      return spacetradersApi
        .get(waypointApi.getWaypointsForSystem(sysId, limit, page))
        .then((res) => res.data)
        .catch((ex) => {
          console.log(ex);
        });
    };
  },

  async getShipyardForWaypoint(
    systemSymbol: string,
    waypointSymbol: string,
  ): Promise<ResponseData<Shipyard>> {
    return spacetradersApi
      .get(waypointApi.getShipyardForWaypoint(systemSymbol, waypointSymbol))
      .then((res) => res.data)
      .catch((ex) => {
        console.log(ex);
      });
  },
};

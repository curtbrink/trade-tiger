import spacetradersApi from '@/api/spacetraders.api';
import { PagedResponseData } from '@/api/misc.types';
import { Waypoint } from '@/api/waypoint/waypoint.model';

const waypointApi = {
  getWaypointsForSystem: (system: string, limit: number, page: number) =>
    `systems/${system}/waypoints?page=${page}&limit=${limit}`,
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
};

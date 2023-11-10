import spacetradersApi from '@/api/api/spacetraders.api';
import { PagedResponseData, ResponseData } from '@/api/models/misc.types';
import { Ship } from '@/api/models/ship.model';
import {
  DockShipResponse,
  NavigateShipResponse,
  OrbitShipResponse,
  PurchaseShipResponse,
  RefreshNavResponse,
  RefuelShipResponse,
} from '@/api/api/ship/ship-response.model';
import {
  NavigateShipRequest,
  PurchaseShipRequest,
} from '@/api/api/ship/ship-request.model';
import { ShipyardShipType } from '@/api/models/shipyard.model';

const shipApi = {
  getMyShips: (limit: number, page: number) =>
    `my/ships?page=${page}&limit=${limit}`,
  dockShip: (symbol: string) => `my/ships/${symbol}/dock`,
  orbitShip: (symbol: string) => `my/ships/${symbol}/orbit`,
  navigateShip: (symbol: string) => `my/ships/${symbol}/navigate`,
  purchaseShip: () => `my/ships`,
  refreshNav: (symbol: string) => `my/ships/${symbol}/nav`,
  refuelShip: (symbol: string) => `my/ships/${symbol}/refuel`,
};

export default {
  getMyShips(
    limit: number = 20,
    page: number = 1,
  ): Promise<PagedResponseData<Ship>> {
    return spacetradersApi
      .get(shipApi.getMyShips(limit, page))
      .then((res) => res.data);
  },

  dockShip(shipSymbol: string): Promise<ResponseData<DockShipResponse>> {
    return spacetradersApi
      .post(shipApi.dockShip(shipSymbol))
      .then((res) => res.data);
  },

  orbitShip(shipSymbol: string): Promise<ResponseData<OrbitShipResponse>> {
    return spacetradersApi
      .post(shipApi.orbitShip(shipSymbol))
      .then((res) => res.data);
  },

  navigateShip(
    shipSymbol: string,
    waypointSymbol: string,
  ): Promise<ResponseData<NavigateShipResponse>> {
    return spacetradersApi
      .post(shipApi.navigateShip(shipSymbol), {
        waypointSymbol,
      } as NavigateShipRequest)
      .then((res) => res.data);
  },

  purchaseShip(
    shipType: ShipyardShipType,
    waypointSymbol: string,
  ): Promise<ResponseData<PurchaseShipResponse>> {
    return spacetradersApi
      .post(shipApi.purchaseShip(), {
        shipType,
        waypointSymbol,
      } as PurchaseShipRequest)
      .then((res) => res.data);
  },

  refreshShipNav(shipSymbol: string): Promise<RefreshNavResponse> {
    return spacetradersApi
      .get(shipApi.refreshNav(shipSymbol))
      .then((res) => res.data);
  },

  refuelShip(shipSymbol: string): Promise<ResponseData<RefuelShipResponse>> {
    return spacetradersApi
      .post(shipApi.refuelShip(shipSymbol))
      .then((res) => res.data);
  },
};

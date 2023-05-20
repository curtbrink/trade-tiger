import spacetradersApi from '@/api/spacetraders.api';
import { PagedResponseData, ResponseData } from '@/api/misc.types';
import { Ship } from '@/api/ship/ship.model';
import {
  DockShipResponse,
  NavigateShipResponse,
  OrbitShipResponse,
  PurchaseShipResponse,
  RefreshNavResponse,
} from '@/api/ship/ship-response.model';
import {
  NavigateShipRequest,
  PurchaseShipRequest,
} from '@/api/ship/ship-request.model';
import { ShipyardShipType } from '@/api/shipyard/shipyard.model';

const shipApi = {
  getMyShips: (limit: number, page: number) =>
    `my/ships?page=${page}&limit=${limit}`,
  dockShip: (symbol: string) => `my/ships/${symbol}/dock`,
  orbitShip: (symbol: string) => `my/ships/${symbol}/orbit`,
  navigateShip: (symbol: string) => `my/ships/${symbol}/navigate`,
  purchaseShip: () => `my/ships`,
  refreshNav: (symbol: string) => `my/ships/${symbol}/nav`,
};

export default {
  getMyShips(
    limit: number = 20,
    page: number = 1,
  ): Promise<PagedResponseData<Ship>> {
    return spacetradersApi
      .get(shipApi.getMyShips(limit, page))
      .then((res) => res.data)
      .catch((ex) => {
        console.log(ex);
      });
  },

  dockShip(shipSymbol: string): Promise<ResponseData<DockShipResponse>> {
    return spacetradersApi
      .post(shipApi.dockShip(shipSymbol))
      .then((res) => res.data)
      .catch((ex) => {
        console.log(ex);
      });
  },

  orbitShip(shipSymbol: string): Promise<ResponseData<OrbitShipResponse>> {
    return spacetradersApi
      .post(shipApi.orbitShip(shipSymbol))
      .then((res) => res.data)
      .catch((ex) => {
        console.log(ex);
      });
  },

  navigateShip(
    shipSymbol: string,
    waypointSymbol: string,
  ): Promise<ResponseData<NavigateShipResponse>> {
    return spacetradersApi
      .post(shipApi.navigateShip(shipSymbol), {
        waypointSymbol,
      } as NavigateShipRequest)
      .then((res) => res.data)
      .catch((ex) => {
        console.log(ex);
      });
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
      .then((res) => res.data)
      .catch((ex) => {
        console.log(ex);
      });
  },

  refreshShipNav(shipSymbol: string): Promise<RefreshNavResponse> {
    return spacetradersApi
      .get(shipApi.refreshNav(shipSymbol))
      .then((res) => res.data)
      .catch((ex) => {
        console.log(ex);
      });
  },
};

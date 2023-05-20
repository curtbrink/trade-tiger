import { ShipyardShipType } from '@/api/shipyard/shipyard.model';

export interface NavigateShipRequest {
  waypointSymbol: string;
}

export interface PurchaseShipRequest {
  shipType: ShipyardShipType;
  waypointSymbol: string;
}

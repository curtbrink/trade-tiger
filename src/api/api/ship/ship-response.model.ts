import { Ship, ShipFuel, ShipNavigation } from '@/api/models/ship.model';
import { Agent } from '@/api/models/agent.model';
import { ShipyardTransaction } from '@/api/models/shipyard.model';
import { MarketTransaction } from '@/api/models/market.model';

interface OrbitDockShipResponse {
  nav: ShipNavigation;
}

export interface DockShipResponse extends OrbitDockShipResponse {}
export interface OrbitShipResponse extends OrbitDockShipResponse {}

export interface NavigateShipResponse {
  nav: ShipNavigation;
  fuel: ShipFuel;
}

export interface PurchaseShipResponse {
  agent: Agent;
  ship: Ship;
  transaction: ShipyardTransaction;
}

export interface RefreshNavResponse {
  data: ShipNavigation; // intentional. doesn't seem to follow the ResponseData pattern
}

export interface RefuelShipResponse {
  agent: Agent;
  fuel: ShipFuel;
  transaction: MarketTransaction;
}

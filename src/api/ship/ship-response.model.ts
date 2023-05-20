import { Ship, ShipFuel, ShipNavigation } from '@/api/ship/ship.model';
import { Agent } from '@/api/agent/agent.model';
import { ShipyardTransaction } from '@/api/shipyard/shipyard.model';

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

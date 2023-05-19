import { ShipFuel, ShipNavigation } from '@/api/ship/ship.model';

interface OrbitDockShipResponse {
  nav: ShipNavigation;
}

export interface DockShipResponse extends OrbitDockShipResponse {}
export interface OrbitShipResponse extends OrbitDockShipResponse {}

export interface NavigateShipResponse {
  nav: ShipNavigation;
  fuel: ShipFuel;
}

import { ShipNavigation } from '@/api/ship/ship.model';

interface OrbitDockShipResponse {
  nav: ShipNavigation;
}

export interface DockShipResponse extends OrbitDockShipResponse {}
export interface OrbitShipResponse extends OrbitDockShipResponse {}

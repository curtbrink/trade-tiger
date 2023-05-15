export enum WaypointType {
  Planet = 'PLANET',
  GasGiant = 'GAS_GIANT',
  Moon = 'MOON',
  OrbitalStation = 'ORBITAL_STATION',
  JumpGate = 'JUMP_GATE',
  AsteroidField = 'ASTEROID_FIELD',
  Nebula = 'NEBULA',
  DebrisField = 'DEBRIS_FIELD',
  GravityWell = 'GRAVITY_WELL',
}

export interface Waypoint {
  symbol: string;
  type: WaypointType;
  systemSymbol: string;
  x: number;
  y: number;
}

import { Agent } from '@/api/agent/agent.model';
import { Contract } from '@/api/contract/contract.model';
import { Faction } from '@/api/faction/faction.model';
import { Ship } from '@/api/ship/ship.model';

export interface RegisterResponse {
  token: string;
  agent: Agent;
  contract: Contract;
  faction: Faction;
  ship: Ship;
}

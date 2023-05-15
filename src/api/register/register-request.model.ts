import { FactionName } from '@/api/faction/faction-name.enum';

export interface RegisterRequest {
  faction: FactionName;
  symbol: string;
}

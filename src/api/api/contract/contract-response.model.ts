import { Agent } from '@/api/models/agent.model';
import { Contract } from '@/api/models/contract.model';

export interface AcceptContractResponse {
  agent: Agent;
  contract: Contract;
}

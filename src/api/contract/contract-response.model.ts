import { Agent } from '@/api/agent/agent.model';
import { Contract } from '@/api/contract/contract.model';

export interface AcceptContractResponse {
  agent: Agent;
  contract: Contract;
}

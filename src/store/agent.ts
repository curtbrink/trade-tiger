// Utilities
import { defineStore } from 'pinia';
import registerApi from '@/api/register/register.api';
import { FactionName } from '@/api/faction/faction-name.enum';
import { Agent } from '@/api/agent/agent.model';
import authService from '@/services/auth.service';
import { useShipStore } from '@/store/ship';
import { useFactionStore } from '@/store/faction';
import { useContractStore } from '@/store/contract';
import agentApi from '@/api/agent/agent.api';

export const useAgentStore = defineStore('agent', {
  state: () => ({
    agent: undefined as Agent | undefined,
  }),
  getters: {
    loggedIn: (state) => state.agent !== undefined,
  },
  actions: {
    async ensureLoaded() {
      if (this.agent) {
        return Promise.resolve();
      }
      const agentResponse = await agentApi.getMyAgent();
      this.agent = agentResponse.data;
    },
    async register(name: string, faction: FactionName) {
      const newAgentResponse = await registerApi.register({
        faction,
        symbol: name,
      });
      const newAgentData = newAgentResponse.data;
      authService.setAuthToken(newAgentData.token);

      // set agent
      this.agent = newAgentData.agent;

      // set ship
      const shipStore = useShipStore();
      shipStore.ships.push(newAgentData.ship);

      // set faction
      const factionStore = useFactionStore();
      factionStore.faction = newAgentData.faction;

      // set contract
      const contractStore = useContractStore();
      contractStore.contract = newAgentData.contract;
    },
  },
});

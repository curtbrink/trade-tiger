// Utilities
import { defineStore } from 'pinia';
import registerApi from '@/api/register/register.api';
import { FactionName } from '@/api/faction/faction-name.enum';
import { Agent } from '@/api/agent/agent.model';

export const useAgentStore = defineStore('agent', {
  state: () => ({
    agent: undefined as Agent | undefined,
  }),
  actions: {
    async register(name: string, faction: FactionName) {
      const derp = await registerApi.register({
        faction,
        symbol: name,
      });
      this.agent = derp.data.agent;
    },
  },
});

import { defineStore } from 'pinia';
import { Faction } from '@/api/faction/faction.model';

export const useFactionStore = defineStore('faction', {
  state: () => ({
    faction: undefined as Faction | undefined,
  }),
  actions: {},
});

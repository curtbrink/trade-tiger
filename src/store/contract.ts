import { defineStore } from 'pinia';
import { Contract } from '@/api/contract/contract.model';

export const useContractStore = defineStore('contract', {
  state: () => ({
    contract: undefined as Contract | undefined,
  }),
  actions: {},
});

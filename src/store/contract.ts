import { defineStore } from 'pinia';
import { Contract } from '@/api/contract/contract.model';
import { iteratePagedData } from '@/api/misc.types';
import contractApi from '@/api/contract/contract.api';

export const useContractStore = defineStore('contract', {
  state: () => ({
    contracts: [] as Contract[],
  }),
  actions: {
    async getAllContracts() {
      this.contracts = await iteratePagedData(contractApi.getMyContracts);
    },
    async ensureLoaded() {
      if (this.contracts.length) {
        return Promise.resolve();
      }
      return this.getAllContracts();
    },
  },
});

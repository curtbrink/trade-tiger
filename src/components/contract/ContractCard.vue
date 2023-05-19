<template>
  <v-card>
    <v-card-title>
      {{ contract.id }}
      <span class="subtitle">{{ subtitle }}</span>
    </v-card-title>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <span>Deadline: {{ deadlineDate }}</span
          ><br />
          <span>Expires: {{ expirationDate }}</span
          ><br />
        </v-col>
        <v-col cols="12">
          <v-table>
            <thead>
              <tr>
                <th class="text-center">Deliver</th>
                <th class="text-center">Destination</th>
                <th class="text-center">Required</th>
                <th class="text-center">Fulfilled</th>
                <th class="text-center">Progress</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in contract.terms.deliver" :key="i">
                <td class="text-center">{{ item.tradeSymbol }}</td>
                <td class="text-center">{{ item.destinationSymbol }}</td>
                <td class="text-center">{{ item.unitsRequired }}</td>
                <td class="text-center">{{ item.unitsFulfilled }}</td>
                <td class="text-center">
                  <v-progress-linear
                    rounded
                    striped
                    height="10"
                    color="light-blue"
                    :model-value="getProgressValue(item)" />
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
      <ContractPayout :payout="contract.terms.payment" />
    </v-card-text>
    <v-card-actions>
      <v-row>
        <v-col v-if="!contract.accepted" cols="12">
          <v-btn
            block
            variant="outlined"
            prepend-icon="mdi-check-bold"
            @click="contractStore.acceptContract(contract.id)"
            >Accept</v-btn
          >
        </v-col>
        <v-col v-else cols="12">
          <v-btn block disabled variant="outlined" prepend-icon="mdi-check-bold"
            >Accepted</v-btn
          >
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { Contract, ContractDelivery } from '@/api/contract/contract.model';
import { computed } from 'vue';
import ContractPayout from '@/components/contract/ContractPayout.vue';
import dayjs from 'dayjs';
import { useContractStore } from '@/store/contract';

const props = defineProps<{
  contract: Contract;
}>();

const contractStore = useContractStore();

const subtitle = computed(() => {
  return `${props.contract.factionSymbol.toLowerCase()} | ${props.contract.type.toLowerCase()}`;
});

const expirationDate = computed(() => {
  return dayjs(props.contract.expiration).format('MMM D, YYYY h:mm A');
});

const deadlineDate = computed(() => {
  return dayjs(props.contract.terms.deadline).format('MMM D, YYYY h:mm A');
});

function getProgressValue(term: ContractDelivery) {
  return (term.unitsFulfilled / term.unitsRequired) * 100;
}
</script>

<style>
.subtitle {
  color: #5b5b66;
  font-style: italic;
}
</style>

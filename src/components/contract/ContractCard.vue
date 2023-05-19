<template>
  <v-card>
    <v-card-title>
      {{ contract.id }}
      <span class="subtitle">{{ subtitle }}</span>
    </v-card-title>
    <v-card-text>
      <ContractPayout :payout="contract.terms.payment" />
    </v-card-text>
    <v-card-actions>
      <v-btn block>Action One</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { Contract } from '@/api/contract/contract.model';
import { computed } from 'vue';
import ContractPayout from '@/components/contract/ContractPayout.vue';

const props = defineProps<{
  contract: Contract;
}>();

const subtitle = computed(() => {
  return `${props.contract.factionSymbol.toLowerCase()} / ${props.contract.type.toLowerCase()}`;
});
</script>

<style>
.subtitle {
  color: #5b5b66;
  font-style: italic;
}
</style>

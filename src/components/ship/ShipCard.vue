<template>
  <v-card>
    <v-card-title>
      {{ ship.registration.name }}
      <span class="subtitle">{{ ship.registration.role }}</span>
    </v-card-title>
    <v-card-text> this is v-card-text </v-card-text>
    <v-card-actions>
      <v-row>
        <v-col v-if="isSelected(ship)" cols="12">
          <v-btn block variant="outlined" disabled prepend-icon="mdi-check-bold"
            >Selected</v-btn
          >
        </v-col>
        <v-col v-else cols="12">
          <v-btn
            block
            variant="outlined"
            prepend-icon="mdi-check-bold"
            @click="shipStore.selectShip(ship.registration.name)"
            >Select</v-btn
          >
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts" setup>
import { Ship } from '@/api/ship/ship.model';
import { useShipStore } from '@/store/ship';

const props = defineProps<{
  ship: Ship;
}>();

const shipStore = useShipStore();

function isSelected(ship) {
  return shipStore.selectedShip?.registration.name === ship.registration.name;
}
</script>

<style>
.subtitle {
  color: #5b5b66;
  font-style: italic;
}
</style>

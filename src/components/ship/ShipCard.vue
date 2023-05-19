<template>
  <v-card>
    <v-card-title>
      {{ ship.registration.name }}
      <span class="subtitle">{{ ship.registration.role }}</span>
    </v-card-title>
    <v-card-text>
      Status: {{ ship.nav.status }} at {{ ship.nav.waypointSymbol }}
    </v-card-text>
    <v-card-actions>
      <v-container>
        <v-row>
          <v-col v-if="isSelected(ship)" cols="12">
            <v-btn
              block
              variant="outlined"
              disabled
              prepend-icon="mdi-check-bold"
              >Selected</v-btn
            >
          </v-col>
          <v-col v-else cols="12">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-check-bold"
              @click="shipStore.selectShip(ship.symbol)"
              >Select</v-btn
            >
          </v-col>
        </v-row>
        <v-row v-if="isSelected(ship)">
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-flare"
              @click="shipStore.dockShip(ship.symbol)"
              >Dock</v-btn
            >
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-rocket-launch"
              @click="shipStore.orbitShip(ship.symbol)"
              >Orbit</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
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
  return shipStore.selectedShip?.symbol === ship.symbol;
}
</script>

<style>
.subtitle {
  color: #5b5b66;
  font-style: italic;
}
</style>

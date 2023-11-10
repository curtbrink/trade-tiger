<template>
  <v-card>
    <v-card-title>Actions</v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
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
        <v-row v-if="showRefuel(ship)">
          <v-col cols="12">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-barrel"
              @click="shipStore.refuelShip(ship.symbol)"
              :disabled="!canRefuel(ship)"
              >Refuel</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script lang="ts" setup>
import { Ship } from '@/api/models/ship.model';
import { useShipStore } from '@/store/ship';
import { useMarketStore } from '@/store/market';

const props = defineProps<{
  ship: Ship;
}>();

const shipStore = useShipStore();
const marketStore = useMarketStore();

function isSelected(ship: Ship) {
  return shipStore.selectedShip?.symbol === ship.symbol;
}

function showRefuel(ship: Ship) {
  return isSelected(ship) && marketStore.canRefuel;
}
function canRefuel(ship: Ship) {
  return showRefuel(ship) && ship.fuel.current < ship.fuel.capacity;
}
</script>

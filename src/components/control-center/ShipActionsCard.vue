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
              :disabled="!canDock"
              >Dock</v-btn
            >
          </v-col>
          <v-col cols="6">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-rocket-launch"
              @click="shipStore.orbitShip(ship.symbol)"
              :disabled="!canDock"
              >Orbit</v-btn
            >
          </v-col>
        </v-row>
        <v-row v-if="showRefuel">
          <v-col cols="12">
            <v-btn
              block
              variant="outlined"
              prepend-icon="mdi-barrel"
              @click="shipStore.refuelShip(ship.symbol)"
              :disabled="!canRefuel"
              >Refuel</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script lang="ts" setup>
import { useShipStore } from '@/store/ship';
import { useMarketStore } from '@/store/market';
import { computed } from 'vue';
import { ShipNavigationStatus } from '@/api/models/ship.model';

const shipStore = useShipStore();
const marketStore = useMarketStore();

const ship = shipStore.selectedShip!;

const showRefuel = computed(() => marketStore.canRefuel);
const canRefuel = computed(
  () =>
    showRefuel.value &&
    ship.nav.status === ShipNavigationStatus.Docked &&
    ship.fuel.current < ship.fuel.capacity,
);

const canDock = computed(
  () => ship.nav.status !== ShipNavigationStatus.InTransit,
);
</script>

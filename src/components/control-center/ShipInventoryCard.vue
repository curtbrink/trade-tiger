<template>
  <v-card>
    <v-card-title>
      Inventory
      <span class="subtitle">
        {{ ship.cargo.units }} / {{ ship.cargo.capacity }}
      </span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col v-for="(item, i) in ship.cargo.inventory" :key="i" cols="1">
            <v-card variant="outlined">
              <v-card-title>{{ item.units }}</v-card-title>
              <v-card-text>{{ item.name }}</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
<script lang="ts" setup>
import { useShipStore } from '@/store/ship';

const shipStore = useShipStore();
const ship = shipStore.selectedShip!;
</script>

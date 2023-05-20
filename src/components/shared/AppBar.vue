<template>
  <v-app-bar class="pl-5 title-bar">
    <b>TRADE-TIGER</b>
    <template v-slot:append>
      <v-container class="fill-width">
        <v-row>
          <v-col cols="4">
            <div v-if="agentStore.loggedIn">
              <v-icon>mdi-currency-usd</v-icon>
              {{ prettyNumber(agentStore.agent?.credits) }}
            </div>
          </v-col>
          <v-col cols="4">
            <div v-if="shipStore.selectedShip">
              <v-icon>mdi-flare</v-icon> {{ shipStore.currentSystem }}
            </div>
          </v-col>
          <v-col cols="4">
            <div v-if="shipStore.selectedShip">
              <v-icon>mdi-map-marker</v-icon>
              {{ shipStore.currentWaypoint }}
            </div>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useAgentStore } from '@/store/agent';
import { useShipStore } from '@/store/ship';
import { prettyNumber } from '@/api/misc.types';

const agentStore = useAgentStore();
const shipStore = useShipStore();
</script>

<style>
.title-bar {
  font-family: 'Audiowide', cursive;
}

.fill-width {
  min-width: 700px;
}
</style>

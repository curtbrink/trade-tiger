<template>
  <v-card v-if="shipStore.selectedShip">
    <v-card-title>
      {{ selectedShip.registration.name }}
      <span class="subtitle">{{ selectedShip.registration.role }}</span>
    </v-card-title>
    <v-card-text>
      <v-card variant="outlined">
        <v-card-title>Status</v-card-title>
        <v-card-text>{{ status }}</v-card-text>
      </v-card>
      <v-card variant="outlined" v-if="status === 'In Transit'">
        <v-card-title>Journey</v-card-title>
        <v-card-text>
          <v-row>
            <v-col>
              Origin: {{ selectedShip.nav.route.origin.symbol }}<br />
              (time): {{ prettyDate(selectedShip.nav.route.departureTime)
              }}<br />
              Destination: {{ selectedShip.nav.route.destination.symbol }}<br />
              (time): {{ prettyDate(selectedShip.nav.route.arrival) }}
            </v-col>
          </v-row>
          <v-row align="center" justify="center">
            <v-col cols="9">
              <v-progress-linear
                :model-value="getRouteProgress(selectedShip)"
                height="10"
                striped
                color="light-blue" />
            </v-col>
            <v-col cols="3">
              <v-btn @click="updateNow">Refresh</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>
<script lang="ts" setup>
import { Ship, ShipNavigationStatus } from '@/api/models/ship.model';
import { prettyDate } from '@/api/models/misc.types';
import dayjs from 'dayjs';
import { onMounted, ref } from 'vue';
import { useShipStore } from '@/store/ship';

const shipStore = useShipStore();
const selectedShip = shipStore.selectedShip!;

let now = ref(dayjs());
function updateNow() {
  now.value = dayjs();
}
onMounted(() => {
  updateNow();
});

const status = isMoving(selectedShip) ? 'In Transit' : selectedShip.nav.status;

function isMoving(ship: Ship) {
  return ship.nav.status === ShipNavigationStatus.InTransit;
}
function getRouteProgress(ship: Ship) {
  const depart = dayjs(ship.nav.route.departureTime);
  const arrive = dayjs(ship.nav.route.arrival);

  const totalSeconds = arrive.diff(depart, 'second');
  const elapsedSeconds = now.value.diff(depart, 'second');
  const percent = (elapsedSeconds / totalSeconds) * 100;
  if (ship.nav.status === ShipNavigationStatus.InTransit && percent > 100) {
    shipStore.refreshNav(ship.symbol);
  }
  return percent;
}
</script>

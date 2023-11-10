<template>
  <v-data-table
    :headers="headers"
    :items="formattedItems"
    item-value="symbol"
    v-model:sort-by="sortBy"
    class="elevation-1">
    <template v-slot:item.actions="{ item }">
      <div v-if="item.symbol === props.currentWaypoint">
        <v-icon>mdi-map-marker-account</v-icon> You are here
      </div>
      <div v-else>
        <v-btn
          block
          variant="outlined"
          prepend-icon="mdi-rocket"
          @click="shipStore.navigateSelectedShip(item.symbol)"
          >Move To</v-btn
        >
      </div>
    </template>
  </v-data-table>
</template>
<script lang="ts" setup>
import { Waypoint } from '@/api/models/waypoint.model';
import { useShipStore } from '@/store/ship';
import { useCurrentLocationStore } from '@/store/current-location';

const props = defineProps<{
  waypoints: Waypoint[];
  currentWaypoint: string | undefined;
}>();

const shipStore = useShipStore();
const currentLocationStore = useCurrentLocationStore();

function getDistance(waypoint: Waypoint) {
  const xDiff =
    Math.max(waypoint.x, currentLocationStore.currentWaypoint!.x) -
    Math.min(waypoint.x, currentLocationStore.currentWaypoint!.x);
  const yDiff =
    Math.max(waypoint.y, currentLocationStore.currentWaypoint!.y) -
    Math.min(waypoint.y, currentLocationStore.currentWaypoint!.y);

  return Math.round(Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2)));
}

const headers = [
  { title: 'Waypoint', align: 'center', sortable: true, key: 'symbol' },
  { title: 'Type', align: 'center', sortable: false, key: 'type' },
  {
    title: 'Coordinates',
    align: 'center',
    sortable: false,
    key: 'coordinates',
  },
  { title: 'Distance', align: 'center', sortable: false, key: 'distance' },
  { title: 'Traits', align: 'center', sortable: false, key: 'traits' },
  { title: 'Actions', align: 'center', sortable: false, key: 'actions' },
];

const formattedItems = props.waypoints.map((it) => ({
  symbol: it.symbol,
  type: it.type,
  coordinates: `( ${it.x}, ${it.y} )`,
  distance: getDistance(it),
  traits: it.traits.map((trait) => trait.symbol).join(' | '),
}));

const sortBy = [
  {
    key: 'symbol',
    order: 'asc',
  },
];
</script>

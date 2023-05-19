<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-center">Waypoint</th>
        <th class="text-center">Type</th>
        <th class="text-center">Coordinates</th>
        <th class="text-center">Traits</th>
        <th class="text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in systemStore.systemWaypoints" :key="i">
        <td class="text-center">{{ item.symbol }}</td>
        <td class="text-center">{{ item.type }}</td>
        <td class="text-center">{{ getCoordinates(item) }}</td>
        <td class="text-center">{{ getTraits(item) }}</td>
        <td class="text-center">
          <div v-if="item.symbol === shipStore.currentWaypoint">
            <v-icon>mdi-map-marker-account</v-icon> You are here
          </div>
          <div v-else>
            <v-btn block variant="outlined" prepend-icon="mdi-rocket"
              >Move To</v-btn
            >
          </div>
        </td>
      </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
import { useSystemStore } from '@/store/system';
import { onBeforeMount } from 'vue';
import { useShipStore } from '@/store/ship';
import { Waypoint } from '@/api/waypoint/waypoint.model';

const systemStore = useSystemStore();
const shipStore = useShipStore();

onBeforeMount(async () => {
  if (!shipStore.currentSystem) {
    return;
  }
  await systemStore.getWaypointsForSystem(shipStore.currentSystem);
});

function getCoordinates(waypoint: Waypoint) {
  return `( ${waypoint.x}, ${waypoint.y} )`;
}

function getTraits(waypoint: Waypoint) {
  return waypoint.traits.map((it) => it.symbol).join(' | ');
}
</script>

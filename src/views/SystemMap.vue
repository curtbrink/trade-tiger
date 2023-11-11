<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="3"></v-col>
      <v-col cols="6">
        <VuePlotly :data="plottedData" :layout="layout"></VuePlotly>
      </v-col>
      <v-col cols="3"></v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { VuePlotly } from 'vue3-plotly';
import { useCurrentLocationStore } from '@/store/current-location';
import { WaypointType } from '@/api/models/waypoint.model';

const currentLocationStore = useCurrentLocationStore();

const waypointGroups = {
  planet: [WaypointType.Planet, WaypointType.GasGiant, WaypointType.Moon],
  asteroid: [
    WaypointType.Asteroid,
    WaypointType.AsteroidBase,
    WaypointType.EngineeredAsteroid,
    WaypointType.AsteroidField,
  ],
  artificial: [
    WaypointType.FuelStation,
    WaypointType.OrbitalStation,
    WaypointType.JumpGate,
  ],
  other: [
    WaypointType.ArtificialGravityWell,
    WaypointType.GravityWell,
    WaypointType.DebrisField,
    WaypointType.Nebula,
  ],
};

const markerStyle = {
  planet: '#eee',
  asteroid: '#f00',
  artificial: '#0f0',
  other: '#00f',
};

function getDataForWaypointGroup(
  group: 'planet' | 'asteroid' | 'artificial' | 'other',
) {
  const filteredWaypoints = currentLocationStore.systemWaypoints.filter((it) =>
    waypointGroups[group].includes(it.type),
  );
  return {
    x: filteredWaypoints.map((wp) => wp.x),
    y: filteredWaypoints.map((wp) => wp.y),
    text: filteredWaypoints.map((wp) => wp.symbol),
    type: 'scatter',
    mode: 'markers',
    marker: {
      color: markerStyle[group],
    },
  };
}

const plottedData = [
  getDataForWaypointGroup('planet'),
  getDataForWaypointGroup('asteroid'),
  getDataForWaypointGroup('artificial'),
  getDataForWaypointGroup('other'),
];
const layout = {
  paper_bgcolor: '#121212',
  plot_bgcolor: '#121212',
  width: 900,
  height: 900,
};
</script>

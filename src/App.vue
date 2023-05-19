<template>
  <v-app>
    <v-main>
      <AppBar />
      <NavDrawer />
      <v-container fill-height fluid>
        <suspense>
          <router-view />
        </suspense>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import NavDrawer from '@/components/shared/NavDrawer.vue';
import { onBeforeMount } from 'vue';
import AppBar from '@/components/shared/AppBar.vue';

onBeforeMount(() => {
  document.title = 'Trade Tiger';
});
</script>

<style>
@font-face {
  font-family: 'Audiowide';
  font-display: block;
  src: url('/fonts/Audiowide-Regular.ttf');
}
</style>

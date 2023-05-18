<template>
  <v-app>
    <v-main>
      <v-app-bar class="pl-5 title-bar">TRADE-TIGER</v-app-bar>
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
</script>

<style>
@font-face {
  font-family: 'Audiowide';
  font-display: block;
  src: url('/fonts/Audiowide-Regular.ttf');
}

.title-bar {
  font-family: 'Audiowide', cursive;
}
</style>

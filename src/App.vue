<template>
  <v-app>
    <v-main>
      <v-app-bar class="pl-5 title-bar">TRADE-TIGER</v-app-bar>
      <suspense>
        <router-view />
      </suspense>
    </v-main>
  </v-app>
</template>

<script setup lang="ts"></script>

<style>
@font-face {
  font-family: 'Audiowide';
  font-display: block;
  src: url('/fonts/Audiowide-Regular.ttf');
}

.title-bar {
  font-family: 'Audiowide';
}
</style>

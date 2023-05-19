<template>
  <v-app>
    <v-main>
      <v-app-bar class="pl-5 title-bar">
        <b>TRADE-TIGER</b>
        <template v-slot:append>
          <div v-if="agentStore.loggedIn">
            <v-container class="fill-width">
              <v-icon>mdi-currency-usd</v-icon> {{ formattedCredits }}
            </v-container>
          </div>
        </template>
      </v-app-bar>
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
import { computed, onBeforeMount } from 'vue';
import { useAgentStore } from '@/store/agent';

const agentStore = useAgentStore();

const formattedCredits = computed(() => {
  return new Intl.NumberFormat('en-US').format(agentStore.agent?.credits || 0);
});

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

.title-bar {
  font-family: 'Audiowide', cursive;
}

.fill-width {
  min-width: 200px;
}
</style>

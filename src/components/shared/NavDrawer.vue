<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list density="compact" nav>
      <v-list-item
        v-for="(item, i) in agentStore.loggedIn ? regularItems : authItems"
        :key="i"
        :to="{ path: item.routePath }"
        :prepend-icon="item.icon"
        :title="item.label"></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useAgentStore } from '@/store/agent';

const agentStore = useAgentStore();

const authItems = [
  {
    icon: 'mdi-account',
    routePath: '/auth',
    label: 'Log In',
  },
];
const regularItems = [
  {
    icon: 'mdi-home',
    routePath: '/',
    label: 'Home',
  },
  {
    icon: 'mdi-rocket-launch',
    routePath: '/',
    label: 'Ships',
  },
];
</script>

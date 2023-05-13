<template>
  <v-container class="fill-height">
    <v-card>
      <v-card-title>This is a card</v-card-title>
      <v-card-text>Wow! Would ya look at that</v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import spacetradersService from '@/services/spacetraders.service';
import { ref } from 'vue';

const thing = await spacetradersService.agents.getMyAgent();
const reactiveThing = ref(thing);
</script>

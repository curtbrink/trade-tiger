<template>
  <v-container class="fill-height">
    <v-card>
      <v-card-title>This is a card</v-card-title>
      <v-card-text>Wow! Would ya look at that</v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import registerApi from '@/api/register/register.api';
import { FactionName } from '@/api/faction/faction-name.enum';

const thingy = await registerApi.register({
  faction: FactionName.Dominion,
  symbol: 'HERPALERPRIK',
});
console.log(thingy);

const derp = thingy.data.token;
</script>

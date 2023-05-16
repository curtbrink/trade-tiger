<template>
  <div>
    <v-text-field v-model="selectedName" label="Pick a name"></v-text-field>
    <v-select
      v-model="selectedFaction"
      :items="factionOptions"
      label="Pick a faction"></v-select>
    <v-btn block @click="registerNewAgent">Register</v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import authService from '@/services/auth.service';
import router from '@/router';
import { FactionName } from '@/api/faction/faction-name.enum';

const selectedName = ref<string>('');
const selectedFaction = ref<FactionName>(FactionName.Cosmic);

const factionOptions = Object.values(FactionName).filter((it) =>
  isNaN(Number(it)),
);

function registerNewAgent() {
  authService.setAuthToken('this is just a test for now');
  router.push({ path: '/' });
}
</script>

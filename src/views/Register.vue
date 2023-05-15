<template>
  <div>
    <h1>Holy crap</h1>
    <v-btn @click="setToken">Set my token</v-btn>
  </div>
</template>

<script lang="ts" setup>
import authService from '@/services/auth.service';

function setToken() {
  authService.setAuthToken('derpalerp!');
}
</script>

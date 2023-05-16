<template>
  <div>
    <v-text-field
      v-model="selectedAuthToken"
      label="Enter auth token"></v-text-field>
    <v-btn block @click="saveToken">Log In</v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import authService from '@/services/auth.service';
import router from '@/router';

const selectedAuthToken = ref('');

function saveToken() {
  authService.setAuthToken(selectedAuthToken.value);
  router.push({ path: '/' });
}
</script>

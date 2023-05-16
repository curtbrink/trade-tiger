<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="2">
        <AuthCard />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import authService from '@/services/auth.service';
import AuthCard from '@/components/login/AuthCard.vue';
</script>

<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="2">
        <v-card>
          <v-card-text>
            This is the home page, you should have an auth token now!<br /><br />
            This is your agent symbol: {{ agentStore.agent?.symbol }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useAgentStore } from '@/store/agent';

const agentStore = useAgentStore();
</script>

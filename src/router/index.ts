// Composables
import { createRouter, createWebHistory } from 'vue-router';
import authService from '@/services/auth.service';
import HomeView from '@/views/Home.vue';
import AuthView from '@/views/Auth.vue';
import ContractView from '@/views/Contract.vue';
import ShipView from '@/views/Ship.vue';
import SystemView from '@/views/System.vue';
import ShipyardView from '@/views/Shipyard.vue';
import { useAgentStore } from '@/store/agent';
import { useShipStore } from '@/store/ship';
import { useContractStore } from '@/store/contract';
import { useSystemStore } from '@/store/system';
import { useShipyardStore } from '@/store/shipyard';

type DataTag = 'agent' | 'contract' | 'ship';

const routes = [
  {
    path: '/',
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/agent',
    redirect: '/',
  },
  {
    path: '/ships',
    component: ShipView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/contracts',
    component: ContractView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/factions',
    redirect: '/',
  },
  {
    path: '/systems',
    component: SystemView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/shipyard',
    component: ShipyardView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/auth',
    component: AuthView,
    meta: {
      requiresAuth: false,
    },
    beforeEnter: () => {
      authService.clearAuthToken();
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from) => {
  if (to.meta.requiresAuth) {
    if (!authService.hasAuthToken()) {
      // bye
      await router.push({ path: '/auth', replace: true });
    } else {
      const agentStore = useAgentStore();
      await agentStore.ensureLoaded();
      const contractStore = useContractStore();
      await contractStore.ensureLoaded();
      const shipStore = useShipStore();
      await shipStore.ensureLoaded();
      const systemStore = useSystemStore();
      await systemStore.ensureLoaded();
      const shipyardStore = useShipyardStore();
      await shipyardStore.ensureLoaded();
    }
  }
});

export default router;

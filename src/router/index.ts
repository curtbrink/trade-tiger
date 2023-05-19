// Composables
import { createRouter, createWebHistory } from 'vue-router';
import authService from '@/services/auth.service';
import HomeView from '@/views/Home.vue';
import AuthView from '@/views/Auth.vue';
import ContractView from '@/views/Contract.vue';
import ShipView from '@/views/Ship.vue';
import SystemView from '@/views/System.vue';
import { useAgentStore } from '@/store/agent';
import { useShipStore } from '@/store/ship';
import { useContractStore } from '@/store/contract';

type DataTag = 'agent' | 'contract' | 'ship';

const routes = [
  {
    path: '/',
    component: HomeView,
    meta: {
      requiresAuth: true,
      loadData: ['agent', 'ship'] as DataTag[],
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
      loadData: ['agent', 'ship'],
    },
  },
  {
    path: '/contracts',
    component: ContractView,
    meta: {
      requiresAuth: true,
      loadData: ['agent', 'contract', 'ship'] as DataTag[],
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
      loadData: ['agent', 'ship'] as DataTag[],
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
  if (to.meta.requiresAuth && !authService.hasAuthToken()) {
    // bye
    await router.push({ path: '/auth', replace: true });
  }

  // @ts-ignore
  if (to.meta.loadData?.length) {
    const dataTags = to.meta.loadData as DataTag[];
    if (dataTags.includes('agent')) {
      const agentStore = useAgentStore();
      await agentStore.ensureLoaded();
    }
    if (dataTags.includes('contract')) {
      const contractStore = useContractStore();
      await contractStore.ensureLoaded();
    }
    if (dataTags.includes('ship')) {
      const shipStore = useShipStore();
      await shipStore.ensureLoaded();
    }
  }
});

export default router;

// Composables
import { createRouter, createWebHistory } from 'vue-router';
import authService from '@/services/auth.service';
import HomeView from '@/views/Home.vue';
import AuthView from '@/views/Auth.vue';
import { useAgentStore } from '@/store/agent';
import { useShipStore } from '@/store/ship';

const routes = [
  {
    path: '/',
    component: HomeView,
    meta: {
      requiresAuth: true,
      loadData: true,
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

  if (to.meta.loadData) {
    const agentStore = useAgentStore();
    await agentStore.ensureLoaded();

    const shipStore = useShipStore();
    await shipStore.ensureLoaded();
  }
});

export default router;

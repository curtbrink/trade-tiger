// Composables
import { createRouter, createWebHistory } from 'vue-router';
import authService from '@/services/auth.service';

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/register',
    component: () => import('@/views/Register.vue'),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/derp',
    component: () => import('@/views/Home.vue'),
    meta: {
      requiresAuth: true,
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
    await router.push({ path: '/register', replace: true });
  }
});

export default router;

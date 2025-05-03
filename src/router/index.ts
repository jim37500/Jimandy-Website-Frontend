import { useAuthStore } from '@/stores/auth';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: () => import('@/views/RootPage.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/HomePage.vue'),
        },
        {
          path: 'projects',
          name: 'projects',
          component: () => import('@/views/MyProjects.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (to.matched.some((record) => record.meta.requiresAuth) && !authStore.IsLogin) {
    next({ path: '/' });

    return;
  }

  next();
});

export default router;

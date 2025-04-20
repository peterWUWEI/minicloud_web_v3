import AppLayout from '@/layout/AppLayout.vue';
import { useAuthStore } from '../stores/auth';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: AppLayout,
      children: [
        {
          path: '/services',
          name: 'services',
          component: () => import('@/views/services/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/services/create',
          name: 'create_new_service',
          component: () => import('@/views/services/create.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/services/edit/:id',
          name: 'edit_service_by_id',
          component: () => import('@/views/services/edit/_id.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/about',
          name: 'about',
          component: () => import('@/views/about/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/about/create',
          name: 'create_new_about',
          component: () => import('@/views/about/create.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/about/edit/:id',
          name: 'edit_about_by_id',
          component: () => import('@/views/about/edit/_id.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/companyinfo',
          name: 'companyInfo',
          component: () => import('@/views/CompanyInfo.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/teammembers',
          name: 'teammembers',
          component: () => import('@/views/TeamMembers.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/sitepolicy',
          name: 'sitepolicy',
          component: () => import('@/views/SitePolicy.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/contacts',
          name: 'contacts',
          component: () => import('@/views/Contacts.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/news',
          name: 'news',
          component: () => import('@/views/News.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/jobs',
          name: 'jobs',
          component: () => import('@/views/Jobs.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/qnas',
          name: 'qnas',
          component: () => import('@/views/Qnas.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/others',
          name: 'others',
          component: () => import('@/views/Others.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/notfound',
      name: 'notfound',
      component: () => import('@/views/pages/NotFound.vue')
    },

    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/pages/Login.vue')
    },
    {
      path: '/access',
      name: 'accessDenied',
      component: () => import('@/views/pages/Access.vue')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('@/views/pages/Error.vue')
    }
  ]
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;

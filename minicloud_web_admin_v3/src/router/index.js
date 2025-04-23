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
          component: () => import('@/views/teammembers/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/teammembers/create',
          name: 'create_new_teammember',
          component: () => import('@/views/teammembers/create.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/teammembers/edit/:id',
          name: 'edit_teammember_by_id',
          component: () => import('@/views/teammembers/edit/_id.vue'),
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
          component: () => import('@/views/contacts/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/contacts/create',
          name: 'create_new_contact',
          component: () => import('@/views/contacts/create.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/contacts/edit/:id',
          name: 'edit_contact_by_id',
          component: () => import('@/views/contacts/edit/_id.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/news',
          name: 'news',
          component: () => import('@/views/news/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/news/create',
          name: 'create_new_news',
          component: () => import('@/views/news/create.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/news/edit/:id',
          name: 'edit_news_by_id',
          component: () => import('@/views/news/edit/_id.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/jobs',
          name: 'jobs',
          component: () => import('@/views/jobs/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/jobs/create',
          name: 'create_new_job',
          component: () => import('@/views/jobs/create.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/jobs/edit/:id',
          name: 'edit_job_by_id',
          component: () => import('@/views/jobs/edit/_id.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/qnas',
          name: 'qnas',
          component: () => import('@/views/qnas/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/qnas/create',
          name: 'create_new_qna',
          component: () => import('@/views/qnas/create.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/qnas/edit/:id',
          name: 'edit_qna_by_id',
          component: () => import('@/views/qnas/edit/_id.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/others',
          name: 'others',
          component: () => import('@/views/others/index.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/others/create',
          name: 'create_new_others',
          component: () => import('@/views/others/create.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/others/edit/:id',
          name: 'edit_others_by_id',
          component: () => import('@/views/others/edit/_id.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/pages/Login.vue')
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

import { createRouter, createWebHistory } from 'vue-router'

export enum RouteNames {
  HOME = '/',
  PROJECTS = 'projects',
  SKILLS = 'skills',
  PROFILE = 'profile',
  NOT_FOUND = 'not-found',
}

export enum AdminRouteNames {
  ADMIN = 'admin',
  DASHBOARD = 'dashboard',
}

export enum AuthRouteNames {
  LOGIN = 'login',
  REGISTER = 'register',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: () => import('@/shared/ui/layouts/AppLayout.vue'),
      children: [
        {
          path: '',
          name: RouteNames.HOME,
          component: () => import('@/pages/main/ui/MainPage.vue'),
        },
        {
          path: 'projects',
          name: RouteNames.PROJECTS,
          component: () => import('@/pages/projects/ui/ProjectsPage.vue'),
        },
        {
          path: 'skills',
          name: RouteNames.SKILLS,
          component: () => import('@/pages/skills/ui/SkillsPage.vue'),
        },
        {
          path: 'profile',
          name: RouteNames.PROFILE,
          component: () => import('@/pages/profile/ui/ProfilePage.vue'),
        },
      ]
    },
    /*  {
       path: '/',
       component: () => import('@/shared/ui/layouts/AuthLayout.vue'),
       children: [
         {
           path: 'login',
           name: AuthRouteNames.LOGIN,
           component: () => import('@/pages/auth/ui/LoginPage.vue'),
         },
         {
           path: 'register',
           name: AuthRouteNames.REGISTER,
           component: () => import('@/pages/auth/ui/RegisterPage.vue'),
         },
       ]
     },
     {
       path: '/admin',
       name: AdminRouteNames.ADMIN,
       component: () => import('@/shared/ui/layouts/AdminLayout.vue'),
       children: [
         {
           path: 'dashboard',
           name: AdminRouteNames.DASHBOARD,
           component: () => import('@/pages/admin/ui/DashboardPage.vue'),
         },
       ]
     },
     {
       path: '/:pathMatch(.*)*',
       name: RouteNames.NOT_FOUND,
       component: () => import('@/pages/not-found/ui/NotFoundPage.vue'),
     } */
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 96,
      }
    }
    return { top: 0 }
  },
})

export default router

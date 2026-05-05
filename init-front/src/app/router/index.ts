import { createRouter, createWebHistory } from 'vue-router'

export enum RouteNames {
  HOME = 'home',
  PROJECTS = 'projects',
  SKILLS = 'skills',
  PROFILE = 'profile',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteNames.HOME,
      component: () => import('@/pages/main/ui/MainPage.vue'),
    },
    {
      path: '/projects',
      name: RouteNames.PROJECTS,
      component: () => import('@/pages/projects/ui/ProjectsPage.vue'),
    },
    {
      path: '/skills',
      name: RouteNames.SKILLS,
      component: () => import('@/pages/skills/ui/SkillsPage.vue'),
    },
    {
      path: '/profile',
      name: RouteNames.PROFILE,
      component: () => import('@/pages/profile/ui/ProfilePage.vue'),
    }
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

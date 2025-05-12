import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import IndexView from '@/views/IndexView.vue'
import EmployeeView from '@/views/EmployeeView.vue'

const routes = [
  {
    path: '/',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'index',
        component: IndexView,
      },
      {
        path: '/employees',
        name: 'employees',
        component: EmployeeView,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

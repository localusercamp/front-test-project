import { createRouter, createWebHistory } from 'vue-router'
import ScheduleView from '@/views/ScheduleView.vue'

const routes = [
  {
    path: '/',
    name: 'schedule',
    component: ScheduleView
  },
  {
    path: '/training_info/:id',
    name: 'training_info',
    props: true,
    component: () => import('@/views/TrainingInfoView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import ListScheduleView from '@/views/ListScheduleView.vue'

const routes = [
  {
    path: '/',
    name: 'list_schedule',
    props: true,
    component: ListScheduleView
  },
  {
    path: '/calendar_schedule',
    name: 'calendar_schedule',
    props: true,
    component: () => import('@/views/CalendarScheduleView.vue')
  },
  {
    path: '/training_info/:id',
    name: 'training_info',
    props: true,
    component: () => import('@/views/TrainingInfoView.vue')
  },
  {
    path: '/training_summary/:id',
    name: 'training_summary',
    props: true,
    component: () => import('@/views/TrainingSummaryView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

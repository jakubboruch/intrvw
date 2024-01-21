import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'App',
    path: '/',
    redirect: '/bus-lines',
    children: [
      {
        name: 'BusStops',
        path: '/stops',
        component: () => import('@/views/BusStopsView.vue'),
      },
      {
        name: 'BusLines',
        path: '/bus-lines',
        component: () => import('@/views/BusLinesView.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

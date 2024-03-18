import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import Guide from '@/layout/guideIndex.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    meta: { title: 'Index' },
    component: () => import('@/views/pub/Index.vue')
  },
  {
    path: '/Main',
    name: 'Main',
    meta: { title: 'Index' },
    component: () => import('@/views/pub/Main.vue')
  },
  {
    path: '/popupGuide',
    name: 'popupGuide',
    meta: { title: '팝업가이드' },
    component: () => import('@/views/pub/popupGuide.vue')
  },
  {
    path: '/tabGuide',
    name: 'Tab Guide',
    meta: { title: '탭가이드' },
    component: () => import('@/views/pub/tabGuide.vue')
  },
  {
    path: '/formGuide',
    name: '폼가이드',
    meta: { title: '폼가이드' },
    component: () => import('@/views/pub/formGuide.vue')
  },
  {
    path: '/expansionPanelsGuide',
    name: 'Expansion panels',
    meta: { title: 'Expansion panels' },
    component: () => import('@/views/pub/expansionPanelsGuide.vue')
  },
  {
    path: '/tabGuide2',
    name: 'Tab Guide2',
    meta: { title: '탭가이드2' },
    component: () => import('@/views/pub/tabGuide2.vue')
  },
  {
    path: '/chartGuide',
    name: 'chart Guide2',
    meta: { title: '차트가이드' },
    component: () => import('@/views/pub/chartGuide.vue')
  },
  {
    path: '/Guide',
    name: 'Guide',
    meta: { title: 'Guide', layout: Guide },
    component: () => import('@/views/guide/Guide.vue')
  }
  ,
  {
    path: '/Components',
    name: 'Components',
    meta: { title: 'Components', layout: Guide },
    component: () => import('@/views/guide/Components.vue')
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

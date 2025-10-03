import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ComparisonView from '../views/ComparisonView.vue'
import ImageGallery from '../views/ImageGallery.vue'
import Diff from '../components/diffSimple.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/comparison',
    name: 'Comparison',
    component: ComparisonView
  },
  {
    path: '/images',
    name: 'Images',
    component: ImageGallery
  },
  {
    path: '/diff',
    name: 'Diff',
    component: Diff
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
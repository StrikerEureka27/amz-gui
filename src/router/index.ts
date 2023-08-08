import AppVue from '@/App.vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import LogIn from '@/views/LogIn.vue';

const router = createRouter({
  //history: createWebHistory(import.meta.env.BASE_URL)
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'App',
      component: AppVue
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/LogIn',
      name: 'LogIn',
      component: LogIn
    }
  ]
})

export default router

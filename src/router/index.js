import { createRouter, createWebHistory } from "vue-router"
import Login from '@/views/Login.vue'
import companyRoutes from "./company"
import userRoutes from "./user"
import Signup from '@/views/Signup.vue'

import CompanyCoupon from '@/views/company/CompanyCoupon.vue'

const routes = [
    ...companyRoutes,
    ...userRoutes,
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
  const companyToken = localStorage.getItem('companyToken');
  const userToken = localStorage.getItem('userToken');

  if (to.path === '/login' || to.path === '/signup') {
    if (userToken) {
      next('/user');
      return;
    } else if (companyToken) {
      next('/company/restaurant')
      return;
    }
  }

  if (to.meta.requiresAuth) {
    if (!companyToken && !userToken) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});


  

export default router
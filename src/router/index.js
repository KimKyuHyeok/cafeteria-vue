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
  if (to.meta.requiresAuth) { // Boolean 값이 true일 때
    const token = localStorage.getItem('companyToken') || localStorage.getItem('userToken'); // 적절한 토큰 확인

    if (!token) {
      next('/login'); // 인증되지 않은 경우 로그인 페이지로 리다이렉트
    } else {
      next(); // 인증된 경우 페이지 접근 허용
    }
  } else {
    next(); // requiresAuth가 없거나 false일 경우 접근 허용
  }
});

  

export default router
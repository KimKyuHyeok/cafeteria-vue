import { createRouter, createWebHistory } from "vue-router";
import Login from '@/views/desktop/Login.vue';
import companyRoutes from "./company";
import userRoutes from "./user";
import Signup from '@/views/desktop/Signup.vue';
import storeRoutes from "./store";
import { apolloClient } from "@/config/apollo-client";
import { VALIDATE_USER_TOKEN } from "@/graphql";

const routes = [
  ...companyRoutes,
  ...userRoutes,
  ...storeRoutes,
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// router.beforeEach((to, from, next) => {
//   const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

//   if (isMobile && to.path === '/login') {
//     window.location.href = 'http://m.localhost/login'
//   } else {
//     next()
//   }
// })

router.beforeEach(async (to, from, next) => {
  const userToken = localStorage.getItem('userToken');
  const companyToken = localStorage.getItem('companyToken');
  const storeToken = localStorage.getItem('storeToken');

  if (to.path === '/login' || to.path === '/signup' || to.path === '/') {
    if (userToken) {
      const isValid = await validateToken(userToken);
      if (isValid) {
        next('/user/coupons');
      } else {
        localStorage.removeItem('userToken');
        next('/login');
      }
      return;
    } else if (companyToken) {
      const isValid = await validateToken(companyToken);
      if (isValid) {
        next('/company/restaurant');
      } else {
        localStorage.removeItem('companyToken');
        next('/login');
      }
      return;
    } else if (storeToken) {
      const isValid = await validateToken(storeToken);
      if (isValid) {
        next('/store/qr-reader');
      } else {
        localStorage.removeItem('storeToken');
        next('/login');
      }
      return;
    }
  }

  if (to.meta.requiresAuth) {
    if (!userToken && !companyToken && !storeToken) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

async function validateToken(token) {
  if (!token) return false;

  try {
    const { data } = await apolloClient.query({
      query: VALIDATE_USER_TOKEN,
      context: {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }
    });

    return data.isValidateUser;
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
}

export default router;

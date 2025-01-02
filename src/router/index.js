import { createRouter, createWebHistory } from "vue-router"
import Login from '@/views/Login.vue'
import companyRoutes from "./company"
import userRoutes from "./user"

import CompanyCoupon from '@/views/company/CompanyCoupon.vue'

const routes = [
    ...companyRoutes,
    ...userRoutes,
    {
        path: '/login',
        name: 'login',
        component: Login
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
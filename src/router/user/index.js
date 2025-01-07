import UserCoupons from '@/views/user/UserCoupons.vue'

const userRoutes = [
    {
        path: '/user/coupons',
        name: 'UserCoupons',
        component: UserCoupons,
        meta: { requiresAuth: true }
    }
]


export default userRoutes
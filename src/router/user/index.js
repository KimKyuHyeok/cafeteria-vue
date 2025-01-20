import UserCoupons from '@/views/desktop/user/UserCoupons.vue'

const userRoutes = [
    {
        path: '/user/coupons',
        name: 'UserCoupons',
        component: UserCoupons,
        meta: { requiresAuth: true }
    }
]


export default userRoutes
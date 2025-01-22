import UserCoupons from '@/views/desktop/user/UserCoupons.vue'
import CompanySearch from '@/views/desktop/user/CompanySearch.vue'

const userRoutes = [
    {
        path: '/user/coupons',
        name: 'UserCoupons',
        component: UserCoupons,
        meta: { requiresAuth: true }
    },
    {
        path: '/user/search-company',
        name: 'CompanySearch',
        component: CompanySearch,
        meta: { requiresAuth: true }
    }
]


export default userRoutes
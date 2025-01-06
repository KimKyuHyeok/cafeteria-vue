import CompanyCoupon from '@/views/company/CompanyCoupon.vue'
import CompanyRestaurant from '@/views/company/CompanyRestaurant.vue'
import CompanyUser from '@/views/company/CompanyUser.vue'

const companyRoutes = [
    {
        path: '/company/coupon',
        name: 'CompanyCoupon',
        component: CompanyCoupon,
        meta: { requiresAuth: true }
    },
    {
        path: '/company/restaurant',
        name: 'CompanyRestaurant',
        component: CompanyRestaurant,
        meta: { requiresAuth: true }
    },
    {
        path: '/company/user',
        name: 'CompanyUser',
        component: CompanyUser,
        meta: { requiresAuth: true }
    }
]

export default companyRoutes
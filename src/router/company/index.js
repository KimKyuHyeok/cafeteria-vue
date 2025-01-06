import CompanyCoupon from '@/views/company/CompanyCoupon.vue'
import CompanyRestaurant from '@/views/company/CompanyRestaurant.vue'

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
    }
]

export default companyRoutes
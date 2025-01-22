import CompanyCoupon from '@/views/desktop/company/CompanyCoupon.vue'
import CompanyRestaurant from '@/views/desktop/company/CompanyRestaurant.vue'
import CompanyUser from '@/views/desktop/company/CompanyUser.vue'
import CompanyPayments from '@/views/desktop/company/CompanyPayments.vue'

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
    },
    {
        path: '/company/payment-history',
        name: 'CompanyPayments',
        component: CompanyPayments,
        meta: { requiresAuth: true }
    }
]

export default companyRoutes
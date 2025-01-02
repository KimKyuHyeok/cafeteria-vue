import CompanyCoupon from '@/views/company/CompanyCoupon.vue'
import CompanyRestaurant from '@/views/company/CompanyRestaurant.vue'

const companyRoutes = [
    {
        path: '/company/coupon',
        name: 'CompanyCoupon',
        component: CompanyCoupon
    },
    {
        path: '/company/restaurant',
        name: 'CompanyRestaurant',
        component: CompanyRestaurant
    }
]

export default companyRoutes
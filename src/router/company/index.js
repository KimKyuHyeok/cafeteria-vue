import CompanyCoupon from '@/views/company/CompanyCoupon.vue'
import CompanyRestaurant from '@/views/company/CompanyRestaurant.vue'
import CompanyUser from '@/views/company/CompanyUser.vue'
import CompanyPayments from '@/views/company/CompanyPayments.vue'

const companyRoutes = [
  {
    path: '/company/coupon',
    name: 'CompanyCoupon',
    component: CompanyCoupon,
    meta: { requiresAuth: true },
  },
  {
    path: '/company/restaurant',
    name: 'CompanyRestaurant',
    component: CompanyRestaurant,
    meta: { requiresAuth: true },
  },
  {
    path: '/company/user',
    name: 'CompanyUser',
    component: CompanyUser,
    meta: { requiresAuth: true },
  },
  {
    path: '/company/payment-history',
    name: 'CompanyPayments',
    component: CompanyPayments,
    meta: { requiresAuth: true },
  },
]

export default companyRoutes

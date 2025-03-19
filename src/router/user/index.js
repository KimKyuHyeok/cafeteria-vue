import UserCoupons from '@/views/user/UserCoupons.vue'
import CompanySearch from '@/views/user/CompanySearch.vue'
import MyPage from '@/views/user/MyPage.vue'

const userRoutes = [
  {
    path: '/user/coupons',
    name: 'UserCoupons',
    component: UserCoupons,
    meta: { requiresAuth: true },
  },
  {
    path: '/user/search-company',
    name: 'CompanySearch',
    component: CompanySearch,
    meta: { requiresAuth: true },
  },
  {
    path: '/user/my-page',
    name: 'MyPage',
    component: MyPage,
    meta: { requiresAuth: true },
  },
]

export default userRoutes

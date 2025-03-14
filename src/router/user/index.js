import UserCoupons from '@/views/desktop/user/UserCoupons.vue'
import CompanySearch from '@/views/desktop/user/CompanySearch.vue'
import MyPage from '@/views/desktop/user/MyPage.vue'

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

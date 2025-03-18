import UserCoupons from '@/views/desktop/user/UserCoupons.vue'
import MobileUserCoupons from '@/views/mobile/user/UserCoupons.vue'
import CompanySearch from '@/views/desktop/user/CompanySearch.vue'
import MobileCompanySearch from '@/views/mobile/user/CompanySearch.vue'
import MyPage from '@/views/desktop/user/MyPage.vue'
import MobileMyPage from '@/views/mobile/user/MyPage.vue'

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
  {
    path: '/m/user/coupons',
    name: 'MobileUserCoupons',
    component: MobileUserCoupons,
    meta: { requiresAuth: true }
  },
  {
    path: '/m/user/search-company',
    name: 'MobileCompanySearch',
    component: MobileCompanySearch,
    meta: { requiresAuth: true }
  },
  {
    path: '/m/user/my-page',
    name: 'MobileUserMyPage',
    component: MobileMyPage,
    meta: { requiresAuth: true }
  }
]

export default userRoutes

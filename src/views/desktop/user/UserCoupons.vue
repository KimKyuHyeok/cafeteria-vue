<script>
import UserHeader from '@/components/user/UserHeader.vue'
import UserCouponList from '@/components/user/UserCouponList.vue'

export default {
  name: 'UserCoupons',
  components: {
    UserHeader,
    UserCouponList,
  },
}
</script>

<template>
  <header>
    <UserHeader />
  </header>
  <user-coupon-list />
</template>

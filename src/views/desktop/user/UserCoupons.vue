<script>
import UserHeader from '@/components/desktop/user/UserHeader.vue'
import UserCouponListVue from '@/components/desktop/user/UserCouponList.vue'
import UserCouponList from '@/components/desktop/user/UserCouponList.vue'

export default {
    name: 'UserCoupons',
    components: {
        UserHeader,
        UserCouponList
    }
}
</script>

<template>
    <header>
        <UserHeader/>
    </header>
    <user-coupon-list/>
</template>

<script>
import CompanyHeaderVue from '@/components/desktop/company/CompanyHeader.vue'
import CompanyCouponList from '@/components/desktop/company/coupon/CompanyCouponList.vue'
export default {
  name: 'CompanyCoupon',
  components: {
    CompanyHeaderVue,
    CompanyCouponList,
  },
}
</script>

<template>
  <header>
    <CompanyHeaderVue />
  </header>
  <CompanyCouponList />
</template>

<style scoped></style>

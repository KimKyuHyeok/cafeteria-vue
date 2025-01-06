<script>
import CompanyHeaderVue from '@/components/company/CompanyHeader.vue'
import CompanyCouponList from '@/components/company/coupon/CompanyCouponList.vue'
export default {
    name: 'CompanyCoupon',
    components: {
        CompanyHeaderVue,
        CompanyCouponList
    }
}
</script>


<template>
    <header>
        <CompanyHeaderVue />
    </header>
    <CompanyCouponList/>
</template>

<style scoped>
</style>
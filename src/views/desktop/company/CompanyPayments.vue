<script>
import CompanyHeaderVue from '@/components/desktop/company/CompanyHeader.vue'
import PaymentList from '@/components/desktop/company/payments/PaymentList.vue'
export default {
    name: 'CompanyPayments',
    components: {
        CompanyHeaderVue,
        PaymentList
    }
}
</script>


<template>
    <header>
        <CompanyHeaderVue />
    </header>
    <PaymentList/>
</template>

<style scoped>
</style>
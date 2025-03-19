<script>
import CompanyHeaderVue from '@/components/company/CompanyHeader.vue'
import PaymentList from '@/components/company/payments/PaymentList.vue'
export default {
  name: 'CompanyPayments',
  components: {
    CompanyHeaderVue,
    PaymentList,
  },
}
</script>

<template>
  <header>
    <CompanyHeaderVue />
  </header>
  <PaymentList />
</template>

<style scoped></style>

<template>
  <div class="payments-table-container">
    <table class="payments-table">
      <thead>
        <tr>
          <th>주문번호</th>
          <th>결제금액</th>
          <th>결제일시</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="payment in payments" :key="payment.id">
          <td>{{ payment.orderId }}</td>
          <td>{{ formatAmount(payment.amount) }}</td>
          <td>{{ formatDate(payment.paymentDate) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { SELECT_PAYMENTS } from '@/graphql'

export default {
  data() {
    return {
      payments: [],
    }
  },
  mounted() {
    this.selectPayments()
  },
  methods: {
    async selectPayments() {
      const { data } = await this.$apollo.query({
        query: SELECT_PAYMENTS,
      })

      this.payments = data.selectPayments

      console.log(this.payments)
    },
    formatDate(date) {
      const d = new Date(date)
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${year}년 ${month}월 ${day}일`
    },
    formatAmount(amount) {
      return `${amount.toLocaleString()}원`
    },
  },
}
</script>

<style scoped>
.payments-table-container {
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.payments-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.payments-table th,
.payments-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.payments-table th {
  background-color: #f3f4f6;
  font-weight: bold;
}

.payments-table tr:hover {
  background-color: #f1f5f9;
}

.payments-table td {
  font-size: 14px;
  color: #333;
}
</style>

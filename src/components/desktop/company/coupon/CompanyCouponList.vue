<template>
  <div class="coupon-list-container">
    <h1>잔여 쿠폰 목록</h1>
    <div id="coupon-list">
      <div v-for="data in restaurantWithCoupons" :key="data.id" class="coupon-item">
        <h3>{{ data.name }}</h3>
        <p>{{ data.address }}</p>
        <p>잔여 수량: {{ data.coupon[0].count }}</p>
        <button @click="paymentPage(data.id)">식권 구매</button>
      </div>
    </div>
  </div>
</template>

<script>
import { GET_COUPONS } from '@/graphql'

export default {
  data() {
    return {
      restaurantWithCoupons: [],
    }
  },
  mounted() {
    this.couponFindByCompanyId()
  },
  methods: {
    async couponFindByCompanyId() {
      const { data } = await this.$apollo.query({
        query: GET_COUPONS,
      })

      this.restaurantWithCoupons = data.couponsFindByCompanyId
    },
    paymentPage(restaurantId) {
      this.$router.push(`/restaurant/${restaurantId}/payment`)
    },
  },
}
</script>

<style scoped>
.coupon-list-container {
  padding: 20px;
}

.coupon-list {
  display: grid;
  margin-top: 10px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.coupon-item {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.coupon-item h3 {
  margin: 0 0 10px;
  font-size: 18px;
}

.coupon-item p {
  margin: 0;
  color: #555;
}
</style>

<template>
  <div class="restaurant-list-container">
    <AddressSelect @restaurants="updateRestaurants" />
    <div v-if="restaurants.length" class="restaurant-list">
      <div v-for="restaurant in restaurants" :key="restaurant.id" class="restaurant-item">
        <h3>{{ restaurant.name }}</h3>
        <p>{{ restaurant.address }}</p>
        <p>장당: {{ restaurant.price }}원</p>
        <button @click="paymentPage()">식권 구매</button>
      </div>
    </div>
    <div v-if="restaurants.length == 0">
      <h4>검색 된 내용이 없습니다.</h4>
    </div>
  </div>
</template>

<script>
import AddressSelect from '@/components/company/restaurant/AddressSelect.vue'

export default {
  components: {
    AddressSelect,
  },
  data() {
    return {
      restaurants: [],
    }
  },
  methods: {
    updateRestaurants(data) {
      this.restaurants = data
    },
    paymentPage() {
      alert('결제 시스템 준비중 입니다.')
      // this.$router.push(`/restaurant/${restaurantId}/payment`)
    },
  },
}
</script>

<style scoped>
.restaurant-list-container {
  padding: 20px;
}

.restaurant-list {
  display: grid;
  margin-top: 10px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.restaurant-item {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.restaurant-item h3 {
  margin: 0 0 10px;
  font-size: 18px;
}

.restaurant-item p {
  margin: 0;
  color: #555;
}
</style>

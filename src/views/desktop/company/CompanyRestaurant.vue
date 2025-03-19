<template>
  <header>
    <CompanyHeaderVue />
  </header>
  <RestaurantList />
</template>

<script>
import CompanyHeaderVue from '@/components/company/CompanyHeader.vue'
import RestaurantList from '@/components/company/restaurant/RestaurantList.vue'

export default {
  name: 'CompanyRestaurant',
  components: {
    CompanyHeaderVue,
    RestaurantList, // RestaurantList 등록
  },
}
</script>

<script>
import UserHeader from '@/components/user/UserHeader.vue'
import CompanySearchBar from '@/components/user/CompanySearchBar.vue'

export default {
  name: 'CompanySearch',
  components: {
    UserHeader,
    CompanySearchBar,
  },
}
</script>

<template>
  <header>
    <UserHeader />
  </header>
  <CompanySearchBar />
</template>

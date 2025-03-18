<script>
import UserHeader from '@/components/mobile/user/UserHeader.vue'
import CompanySearchBar from '@/components/desktop/user/CompanySearchBar.vue'

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

<script>
import UserHeader from '@/components/user/UserHeader.vue'
import MyInfo from '@/components/user/MyInfo.vue'

export default {
  name: 'UserMyPage',
  components: {
    UserHeader,
    MyInfo,
  },
}
</script>

<template>
  <header>
    <UserHeader />
  </header>
  <MyInfo />
</template>

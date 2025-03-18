<script>
import UserHeader from '@/components/mobile/user/UserHeader.vue'
import MyInfo from '@/components/mobile/user/MyInfo.vue'

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

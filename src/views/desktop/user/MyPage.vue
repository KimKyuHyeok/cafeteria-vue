<script>
import UserHeader from '@/components/desktop/user/UserHeader.vue'
import MyInfo from '@/components/desktop/user/MyInfo.vue'

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

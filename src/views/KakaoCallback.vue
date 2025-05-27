<template>
  <div>카카오 로그인 중입니다...</div>
</template>

<script>
import { LOGIN_WITH_KAKAO } from '@/graphql'
export default {
  async mounted() {
    const code = this.$route.query.code

    if (!code) {
      alert('카카오 로그인 실패: 인가 코드 없음')
      return
    }

    try {
      const response = await this.$apollo.mutate({
        mutation: LOGIN_WITH_KAKAO,
        variables: { code },
      })

      const result = response.data.loginWithKakao.isRegistered
      if (result) {
        localStorage.setItem('userToken', response.data.loginWithKakao.accessToken)
        this.$router.push('/user/coupons')
      } else {
        this.$router.push('/auth/signup')
      }
    } catch (error) {
      console.error(error)
      alert('카카오 로그인 실패')
    }
  },
}
</script>

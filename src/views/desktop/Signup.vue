<template>
  <div class="tab-buttons">
    <span :class="{ active: selectedTab === 'user-signup' }" @click="switchTab('user-signup')">유저 회원가입</span>

    <span :class="{ active: selectedTab === 'company-signup' }" @click="switchTab('company-signup')"
      >기업 회원가입</span
    >
  </div>
  <UserSignup v-if="selectedTab === 'user-signup'" />
  <CompanySignup v-if="selectedTab === 'company-signup'" />
</template>

<script>
import CompanySignup from '@/components/desktop/company/CompanySignup.vue'
import UserSignup from '@/components/desktop/user/UserSignup.vue'

export default {
  name: 'Signup',
  components: {
    CompanySignup,
    UserSignup,
  },
  data() {
    return {
      selectedTab: 'user-signup',
    }
  },
  methods: {
    switchTab(tab) {
      this.selectedTab = tab
    },
  },
}
</script>

<style scoped>
.tab-buttons {
  display: flex;
  justify-content: center; /* 탭들을 중앙 정렬 */
  gap: 10px; /* 탭 간의 간격을 좁게 설정 */
  margin-top: 20px;
}

.tab-buttons span {
  cursor: pointer;
  font-size: 16px;
  padding: 10px 20px;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.tab-buttons span.active {
  background-color: #007bff;
  color: white;
}

.tab-buttons span:not(.active):hover {
  background-color: #f0f0f0;
}
</style>

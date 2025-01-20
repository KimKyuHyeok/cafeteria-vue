<script>
import CompanyHeaderVue from '@/components/desktop/company/CompanyHeader.vue'
import CompanyUserApprovedVue from '@/components/desktop/company/member/CompanyUserApproved.vue'
import CompanyUserPendingVue from '@/components/desktop/company/member/CompanyUserPending.vue'
import CompanyUserRejectedVue from '@/components/desktop/company/member/CompanyUserRejected.vue'

export default {
    name: 'CompanyUser',
    components: {
        CompanyHeaderVue,
        CompanyUserApprovedVue,
        CompanyUserPendingVue,
        CompanyUserRejectedVue
    },
    data() {
        return {
            selectedTab: 'approved',
        };
    },
    methods: {
        switchTab(tab) {
            this.selectedTab = tab;
        }
    }
}
</script>

<template>
  <div>
    <header>
      <CompanyHeaderVue />
    </header>

    <div class="tab-buttons">
      <span
        @click="switchTab('pending')"
        :class="{ active: selectedTab === 'pending' }"
      >
        승인요청목록
      </span>
      <span
        @click="switchTab('approved')"
        :class="{ active: selectedTab === 'approved' }"
      >
        승인완료목록
      </span>
      <span
        @click="switchTab('rejected')"
        :class="{ active: selectedTab === 'rejected' }"
      >
        승인거절목록
      </span>
    </div>

    <CompanyUserApprovedVue v-if="selectedTab === 'approved'" />
    <CompanyUserPendingVue v-if="selectedTab === 'pending'" />
    <CompanyUserRejectedVue v-if="selectedTab === 'rejected'" />
  </div>
</template>

<style scoped>
/* 탭 버튼 스타일 */
.tab-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.tab-buttons span {
  cursor: pointer;
  font-size: 16px;
  padding: 10px 20px;
  transition: background-color 0.3s, color 0.3s;
}

.tab-buttons span.active {
  background-color: #007bff;
  color: white;
}

.tab-buttons span:not(.active):hover {
  background-color: #f0f0f0;
}
</style>

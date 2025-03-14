<template>
  <div class="company-list-container">
    <div class="search-bar">
      <form @submit.prevent="searchSubmit">
        <label for="keyword">기업명</label>
        <input v-model="keyword" type="text" name="keyword" />
        <button type="submit" class="submit-btn">검색</button>
      </form>
    </div>

    <div class="company-list">
      <div v-for="company in companyList.companies" :key="company.id" class="company-item">
        <h3>회사명 : {{ company.companyName }}</h3>
        <p>사업자번호 : {{ company.registrationNumber }}</p>
        <button @click="companyUserRequest(company.id)">가입 신청</button>
      </div>
      <div v-if="companyList.length == 0">
        <h5>검색된 내용이 없습니다.</h5>
      </div>
    </div>

    <!-- 페이지네이션 버튼 -->
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="prevPage">이전</button>
      <span>{{ currentPage }} / {{ totalPages }}</span>
      <button :disabled="currentPage >= totalPages" @click="nextPage">다음</button>
    </div>
  </div>
</template>

<script>
import { COMPANY_NAME_SEARCH, COMPANY_USER_JOIN_REQUEST } from '@/graphql'
import { ApolloError } from '@apollo/client'

export default {
  data() {
    return {
      companyList: [],
      keyword: '',
      currentPage: 1,
      totalPages: 1,
      pageSize: 9,
    }
  },
  methods: {
    async searchSubmit() {
      this.currentPage = 1
      await this.fetchCompanies()
    },

    async fetchCompanies() {
      try {
        const { data } = await this.$apollo.query({
          query: COMPANY_NAME_SEARCH,
          variables: {
            data: {
              keyword: this.keyword,
              skip: (this.currentPage - 1) * this.pageSize,
              take: this.pageSize,
            },
          },
        })

        this.companyList = data.companyListSearch

        this.totalPages = Math.ceil(data.companyListSearch.totalCount / this.pageSize)
      } catch (error) {
        console.error('ERROR LOGS : ', error)
      }
    },

    async companyUserRequest(companyId) {
      try {
        const { data } = await this.$apollo.mutate({
          mutation: COMPANY_USER_JOIN_REQUEST,
          variables: {
            data: {
              companyId: Number(companyId),
            },
          },
        })

        const result = data.companyUserJoinRequest

        if (result.success) {
          alert('가입 신청이 완료되었습니다.')
        } else {
          alert('에러가 발생했습니다. 잠시 후에 시도해주세요.')
        }
      } catch (error) {
        if (error instanceof ApolloError) {
          if (error.message === '이미 신청했거나 승인거절 상태입니다.') {
            alert('이미 신청했거나 승인거절 상태입니다.')
          } else {
            console.error('알 수 없는 ApolloError:', error.message)
            alert('에러가 발생했습니다.')
          }
        } else {
          console.error('기타 에러:', error)
          alert('기타 에러가 발생했습니다.')
        }
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.fetchCompanies()
      }
    },

    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.fetchCompanies()
      }
    },
  },
}
</script>

<style scoped>
.company-list-container {
  max-width: 1200px;
  margin: 0 auto;
  margin-top: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 20px;
}

.search-bar form {
  display: flex;
  align-items: center;
  width: 100%;
}

.search-bar label {
  font-size: 16px;
  margin-right: 10px;
}

.search-bar input {
  width: 60%;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.search-bar .submit-btn {
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.search-bar .submit-btn:hover {
  background-color: #0056b3;
}

.company-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.company-item {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.company-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.company-item h3 {
  font-size: 18px;
  margin-bottom: 10px;
}

.company-item p {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
}

.company-item button {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
}

.company-item button:hover {
  background-color: #218838;
}

.company-item h5 {
  font-size: 16px;
  color: #888;
  text-align: center;
  grid-column: span 2;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.pagination button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  margin: 0 5px;
  cursor: pointer;
  border-radius: 4px;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  font-size: 16px;
  margin: 0 10px;
}
</style>

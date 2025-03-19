<template>
  <div class="user-table-wrapper">
    <div class="user-table-container">
      <table class="user-table">
        <thead>
          <tr>
            <th>이름</th>
            <th>전화번호</th>
            <th>이메일</th>
            <th>상태</th>
            <th>승인일</th>
            <th>기타</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in approvedUsers" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.phoneNumber }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.status === 'APPROVED' ? '승인완료' : user.status }}</td>
            <td>{{ formatDate(user.updatedAt) }}</td>
            <td>
              <button @click="deleteUser(user.companyUserId, user.id)">탈퇴</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { DELETE_USER, GET_USERS_APPROVED } from '@/graphql'

export default {
  data() {
    return {
      approvedUsers: [],
    }
  },
  mounted() {
    this.companyUserFindByApproved()
  },
  methods: {
    async companyUserFindByApproved() {
      try {
        const { data } = await this.$apollo.query({
          query: GET_USERS_APPROVED,
        })

        this.approvedUsers = data.userWithCompanyListByApproved
      } catch (error) {
        console.error(error)
      }
    },
    formatDate(date) {
      const d = new Date(date)
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${year}년 ${month}월 ${day}일`
    },
    async deleteUser(id, userId) {
      const confirmed = window.confirm('정말로 탈퇴하시겠습니까?')

      if (confirmed) {
        try {
          const { data } = await this.$apollo.mutate({
            mutation: DELETE_USER,
            variables: { data: { id, userId } },
          })

          alert(data.userCompanyDelete.message)
          location.reload()
        } catch (error) {
          console.error(error)
          alert('에러가 발생했습니다.')
        }
      }
    },
  },
}
</script>

<style scoped>
/* 가로 스크롤을 적용할 부모 div */
.user-table-wrapper {
  width: 100%;
  overflow-x: auto; /* 가로 스크롤 적용 */
  -webkit-overflow-scrolling: touch; /* iOS 부드러운 스크롤 */
}

.user-table-container {
  min-width: 600px; /* 테이블이 너무 좁아지지 않도록 설정 */
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* 테이블 스타일 */
.user-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.user-table th,
.user-table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
}

.user-table th {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

.user-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.user-table tr:hover {
  background-color: #e9ecef;
}

.user-table td {
  font-size: 14px;
  color: #333;
  vertical-align: middle;
}

/* 버튼 스타일 */
.user-table td button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: red;
  color: white;
}

/* 반응형 스타일 */
@media screen and (max-width: 768px) {
  .user-table-container {
    padding: 10px;
  }

  .user-table th,
  .user-table td {
    padding: 8px;
    font-size: 12px;
  }

  .user-table td button {
    padding: 5px 10px;
    font-size: 12px;
  }
}
</style>

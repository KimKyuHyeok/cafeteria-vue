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
            <th>요청일</th>
            <th>기타</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in pendingUsers" :key="user.id">
            <td>{{ user.name }}</td>
            <td>{{ user.phoneNumber }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.status === 'PENDING' ? '승인대기중' : user.status }}</td>
            <td>{{ formatDate(user.createdAt) }}</td>
            <td>
              <button @click="approvedUser(user.id, user.name, user.email)">승인</button>
              <button @click="rejectedUser(user.id, user.name, user.email)">거절</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { GET_USERS_PENDING, APPROVED_USER, REJECTED_USER } from '@/graphql'

export default {
  data() {
    return {
      pendingUsers: [],
    }
  },
  mounted() {
    this.companyUserFindByPending()
  },
  methods: {
    async companyUserFindByPending() {
      try {
        const { data } = await this.$apollo.query({
          query: GET_USERS_PENDING,
        })

        this.pendingUsers = data.userWithCompanyListByPending
      } catch (error) {
        console.log(error)
      }
    },
    formatDate(date) {
      const d = new Date(date)
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${year}년 ${month}월 ${day}일`
    },
    async approvedUser(userId, name, email) {
      try {
        const { data } = await this.$apollo.mutate({
          mutation: APPROVED_USER,
          variables: {
            data: { userId, name, email },
          },
        })

        alert(data.userApproved.message)
        location.reload()
      } catch (error) {
        console.error(error)
        alert('에러가 발생했습니다.')
      }
    },
    async rejectedUser(userId, name, email) {
      try {
        const { data } = await this.$apollo.mutate({
          mutation: REJECTED_USER,
          variables: {
            data: { userId, name, email },
          },
        })

        alert(data.userRejected.message)
        location.reload()
      } catch (error) {
        console.error(error)
        alert('에러가 발생했습니다.')
      }
    },
  },
}
</script>

<style scoped>
/* 컨테이너: 가로 스크롤을 적용할 부모 div */
.user-table-wrapper {
  width: 100%;
  overflow-x: auto; /* 가로 스크롤 활성화 */
  -webkit-overflow-scrolling: touch; /* iOS에서 부드러운 스크롤 */
}

.user-table-container {
  min-width: 600px; /* 테이블이 너무 좁아지지 않도록 최소 너비 설정 */
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

/* 버튼 스타일 */
.user-table td button {
  margin: 2px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.user-table td button:first-child {
  background-color: green;
  color: white;
}

.user-table td button:last-child {
  background-color: red;
  color: white;
}

/* 반응형 스타일 */
@media screen and (max-width: 768px) {
  .user-table-container {
    padding: 10px; /* 모바일에서는 패딩을 줄여서 공간 확보 */
  }

  .user-table th,
  .user-table td {
    padding: 8px; /* 모바일에서는 패딩을 줄여서 가독성 확보 */
    font-size: 12px; /* 폰트 크기 줄이기 */
  }

  .user-table td button {
    padding: 5px 10px;
    font-size: 12px;
  }
}
</style>

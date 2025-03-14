<template>
  <div class="user-table-container">
    <table class="user-table">
      <thead>
        <tr>
          <th>이름</th>
          <th>전화번호</th>
          <th>이메일</th>
          <th>상태</th>
          <th>거절일</th>
          <th>기타</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in rejectedUsers" :key="user.id">
          <td>{{ user.name }}</td>
          <td>{{ user.phoneNumber }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.status === 'REJECTED' ? '승인거절' : user.status }}</td>
          <td>{{ formatDate(user.updatedAt) }}</td>
          <td>
            <button @click="deleteUser(user.companyUserId, user.id)">삭제</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { GET_USERS_REJECTED, DELETE_USER } from '@/graphql'

export default {
  data() {
    return {
      rejectedUsers: [],
    }
  },
  mounted() {
    this.companyUserFindByRejected()
  },
  methods: {
    async companyUserFindByRejected() {
      const { data } = await this.$apollo.query({
        query: GET_USERS_REJECTED,
      })

      this.rejectedUsers = data.userWithCompanyListByRejected
    },
    formatDate(date) {
      const d = new Date(date)
      const year = d.getFullYear()
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const day = String(d.getDate()).padStart(2, '0')
      return `${year}년 ${month}월 ${day}일`
    },
    async deleteUser(id, userId) {
      try {
        const { data } = await this.$apollo.mutate({
          mutation: DELETE_USER,
          variables: {
            data: { id, userId },
          },
        })

        alert(data.userCompanyDelete.message)
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
.user-table-container {
  margin: 20px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.user-table th,
.user-table td {
  padding: 12px;
  border: 1px solid #ddd;
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
}

.user-table th,
.user-table td {
  text-align: center;
}

.user-table td {
  vertical-align: middle;
}
</style>

<template>
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
</template>

<script>
import { GET_USERS_PENDING, APPROVED_USER } from '@/graphql';

export default {
    data() {
        return {
            pendingUsers: []
        }
    },
    methods: {
        async companyUserFindByPending() {
            const { data } = await this.$apollo.query({
                query: GET_USERS_PENDING
            });

            this.pendingUsers = data.userWithCompanyListByPending
        },
        formatDate(date) {
            const d = new Date(date);
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${year}년 ${month}월 ${day}일`;
        },
        async approvedUser(userId, name, email) {
            try {
                const { data } = await this.$apollo.mutate({
                    mutation: APPROVED_USER,
                    variables: {
                        data: { userId, name, email }
                    }
                })

                alert(data.userApproved.message);
                location.reload();
            } catch (error) {
                console.error(error);
                alert('에러가 발생했습니다.')
            }
        },
        async rejectedUser(userId, name, email) {
            try {
                const { data } = await this.$apollo.mutate({
                    mutation: REJECTED_USER,
                    variables: {
                        data: { userId, name, email }
                    }
                })

                alert(data.userRejected.message);
                location.reload();
            } catch (error) {
                console.error(error);
                alert('에러가 발생했습니다.')
            }
        }
    },
    mounted() {
        this.companyUserFindByPending();
    }
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

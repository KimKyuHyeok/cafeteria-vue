<template>
  <div id="user-info-container">
    <form @submit="userInfoUpdate">
      <label for="email">이메일</label>
      <span>{{ userInfo.email }}</span>

      <label for="name">이름</label>
      <input v-model="userInfo.name" type="text" placeholder="이름을 입력하세요" />

      <label for="phone-number">전화번호</label>
      <div id="phone-number">
        <input v-model="userInfo.firstNumber" type="text" placeholder="010" required />
        <label>-</label>
        <input v-model="userInfo.secondNumber" type="text" placeholder="1234" required />
        <label>-</label>
        <input v-model="userInfo.thirdNumber" type="text" placeholder="5678" required />
      </div>

      <label for="password">새 비밀번호</label>
      <input v-model="userInfo.password" type="password" placeholder="비밀번호 입력" />

      <label for="password-confirmation">새 비밀번호 확인</label>
      <input v-model="userInfo.passwordConfirmation" type="password" placeholder="비밀번호 확인" />

      <button type="submit">내 정보 변경하기</button>
    </form>
  </div>

  <div id="company-user-container">
    <div v-for="companyUser in companyUsers" :key="companyUser.id" class="company-user-item">
      <label for="company-name">회사명</label>
      <span class="company-name-text">{{ companyUser.companyName }}</span>

      <label for="status">상태</label>
      <div v-if="companyUser.status === 'PENDING'" class="status-pending">승인 대기 중</div>
      <div v-if="companyUser.status === 'APPROVED'" class="status-approved">승인 완료</div>
      <div v-if="companyUser.status === 'REJECTED'" class="status-rejected">승인 거절</div>
    </div>
  </div>
</template>

<script>
import { USER_INFO_SELECT, USER_INFO_UPDATE } from '@/graphql'

export default {
  data() {
    return {
      userInfo: {
        name: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        firstNumber: '',
        secondNumber: '',
        thirdNumber: '',
      },
      companyUsers: [],
    }
  },
  mounted() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await this.$apollo.query({ query: USER_INFO_SELECT })
        const userInfo = data.myPageInfoSelect.userInfo

        this.userInfo.name = userInfo.name
        this.userInfo.email = userInfo.email

        this.userInfo.firstNumber = userInfo.phoneNumber.split('-')[0]
        this.userInfo.secondNumber = userInfo.phoneNumber.split('-')[1]
        this.userInfo.thirdNumber = userInfo.phoneNumber.split('-')[2]

        this.companyUsers = data.myPageInfoSelect.companyUserInfo
      } catch (error) {
        console.error('User Info Error :', error)
      }
    },
    async userInfoUpdate(event) {
      event.preventDefault()
      let response
      try {
        if (this.userInfo.password) {
          if (this.userInfo.password !== this.userInfo.passwordConfirmation) {
            alert('비밀번호가 일치하지 않습니다.')
            return
          }
          response = await this.$apollo.mutate({
            mutation: USER_INFO_UPDATE,
            variables: { data: { name: this.userInfo.name, password: this.userInfo.password } },
          })
        } else {
          response = await this.$apollo.mutate({
            mutation: USER_INFO_UPDATE,
            variables: { data: { name: this.userInfo.name } },
          })
        }

        console.log('Result : ', response)
      } catch (error) {
        console.error('User Info Update Error :', error)
      }
    },
  },
}
</script>

<style scoped>
#user-info-container {
  width: 90%;
  max-width: 350px;
  margin: 0 auto;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

span {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: block;
  margin-bottom: 12px;
}

#company-user-container {
  width: 100%;
  max-width: 400px;
  margin: 30px auto 0;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.company-user-item {
  padding: 12px;
  margin-bottom: 8px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
}

label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
  font-weight: bold;
}

input[type='text'],
input[type='password'] {
  width: 100%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
  box-sizing: border-box;
}

input:focus {
  border-color: #007bff;
  outline: none;
}

#phone-number {
  display: flex;
  justify-content: space-between;
  gap: 5px;
}

#phone-number input {
  width: 30%;
  padding: 10px;
  font-size: 14px;
}

#phone-number label {
  font-size: 14px;
}

button {
  width: 100%;
  padding: 14px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}

.status-pending {
  color: orange;
}

.status-approved {
  color: green;
}

.status-rejected {
  color: red;
}

@media (max-width: 480px) {
  #user-info-container,
  #company-user-container {
    max-width: 100%;
    padding: 12px;
  }

  input[type='text'],
  input[type='password'],
  button {
    font-size: 14px;
    padding: 12px;
  }

  #phone-number input {
    width: 28%;
    padding: 8px;
    font-size: 12px;
  }
}
</style>

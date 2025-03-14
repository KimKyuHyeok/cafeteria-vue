<template>
  <header>
    <h2>식권모아</h2>
  </header>

  <div id="signup-container">
    <div id="switch-tab">
      <div class="user-signup">
        <span :class="{ active: selectedTab === 'user-signup' }" @click="switchTab('user-signup')">유저 회원가입</span>
      </div>

      <div class="company-signup">
        <span :class="{ active: selectedTab === 'company-signup' }" @click="switchTab('company-signup')"
          >기업 회원가입</span
        >
      </div>

      <div class="store-signup">
        <span :class="{ active: selectedTab === 'store-signup' }" @click="switchTab('store-signup')"
          >상점 회원가입</span
        >
      </div>
    </div>

    <form id="signup" @submit.prevent="signupBtn">
      <div v-if="selectedTab === 'user-signup'" class="user-signup-input">
        <label for="user-email">이메일</label>
        <input id="user-email" v-model="user.email" type="text" placeholder="이메일을 입력하세요." required />
        <label for="user-password">비밀번호</label>
        <input
          id="user-password"
          v-model="user.password"
          type="password"
          placeholder="비밀번호를 입력하세요."
          required
        />
        <label for="user-passwordConfirmation">비밀번호 확인</label>
        <input
          id="user-passwordConfirmation"
          v-model="user.passwordConfirmation"
          type="password"
          placeholder="비밀번호를 입력하세요."
          required
        />
        <label for="user-name">이름</label>
        <input id="user-name" v-model="user.name" type="text" placeholder="이름을 입력하세요." required />
        <label for="user-phoneNumber">전화번호</label>
        <div id="phone-number">
          <input id="firstNumber" v-model="user.firstNumber" type="text" required />
          <label for="phoneNumber">-</label>
          <input id="firstNumber" v-model="user.secondNumber" type="text" required />
          <label for="phoneNumber">-</label>
          <input id="firstNumber" v-model="user.thirdNumber" type="text" required />
        </div>
      </div>

      <div v-if="selectedTab === 'company-signup'" class="company-signup-input">
        <label for="company-companyName">회사명</label>
        <input
          id="company-companyName"
          v-model="company.companyName"
          type="text"
          placeholder="회사명을 입력하세요."
          required
        />
        <label for="company-email">이메일</label>
        <input id="company-email" v-model="company.email" type="text" placeholder="이메일을 입력하세요." required />
        <label for="company-password">비밀번호</label>
        <input
          id="company-password"
          v-model="company.password"
          type="password"
          placeholder="비밀번호를 입력하세요."
          required
        />
        <label for="company-passwordConfirmation">비밀번호 확인</label>
        <input
          id="company-passwordConfirmation"
          v-model="company.passwordConfirmation"
          type="password"
          placeholder="비밀번호를 입력하세요."
          required
        />
        <label for="company-registrationNumber">사업자 번호</label>
        <input
          id="company-registrationNumber"
          v-model="company.registrationNumber"
          type="text"
          placeholder="사업자 번호를 입력하세요."
          required
        />
        <label for="company-manage">담당자</label>
        <input
          id="company-manage"
          v-model="company.manager"
          type="text"
          placeholder="담당자명을 입력하세요."
          required
        />
      </div>

      <div v-if="selectedTab === 'store-signup'" class="store-signup-input">
        <label for="store-email">상점 회원가입</label>
        <input id="store-email" v-model="store.email" type="text" placeholder="이메일을 입력하세요." required />
        <label for="store-password">비밀번호</label>
        <input
          id="store-password"
          v-model="store.password"
          type="password"
          placeholder="비밀번호를 입력하세요."
          required
        />
        <label for="store-password">비밀번호 확인</label>
        <input
          id="store-password"
          v-model="store.password"
          type="password"
          placeholder="비밀번호를 입력하세요."
          required
        />
      </div>

      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<script>
import { COMPANY_SIGNUP, STORE_SIGNUP, USER_SIGNUP } from '@/graphql'

export default {
  name: '',
  data() {
    return {
      selectedTab: 'user-signup',
      user: {
        email: '',
        password: '',
        passwordConfirmation: '',
        name: '',
        firstNumber: '',
        secondNumber: '',
        thirdNumber: '',
      },
      company: {
        companyName: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        registrationNumber: '',
        manager: '',
      },
      store: {
        email: '',
        password: '',
      },
    }
  },
  methods: {
    switchTab(tab) {
      this.selectedTab = tab
    },
    async signupBtn() {
      let response
      let token
      let passwordMatch

      try {
        switch (this.selectedTab) {
          case 'user-signup':
            passwordMatch = this.passwordMatches(this.user.password, this.user.passwordConfirmation)

            if (passwordMatch) {
              response = await this.$apollo.mutate({
                mutation: USER_SIGNUP,
                variables: {
                  data: {
                    email: this.user.email,
                    password: this.user.password,
                    name: this.user.name,
                    phoneNumber: this.firstNumber + '-' + this.secondNumber + '-' + this.thirdNumber,
                  },
                },
              })

              token = response.data.userSignup.accessToken

              if (token) {
                localStorage.setItem('userToken', token)
                this.$router.push('/user/coupons')
              }
              break
            } else {
              alert('비밀번호가 일치하지 않습니다.')
              break
            }
          case 'company-signup':
            passwordMatch = this.passwordMatches(this.company.password, this.company.passwordConfirmation)

            if (passwordMatch) {
              response = await this.$apollo.mutate({
                mutation: COMPANY_SIGNUP,
                variables: {
                  data: {
                    companyName: this.company.companyName,
                    email: this.company.email,
                    password: this.company.password,
                    registrationNumber: this.company.registrationNumber,
                    manager: this.company.manager,
                  },
                },
              })

              token = response.data.companySignup.accessToken

              if (token) {
                localStorage.setItem('companyToken', token)
                this.$router.push('/company/restaurant')
              }
              break
            } else {
              alert('비밀번호가 일치하지 않습니다.')
              break
            }

          case 'store-signup':
            passwordMatch = this.passwordMatches(this.store.password, this.store.passwordConfirmation)

            if (passwordMatch) {
              response = await this.$apollo.mutate({
                mutation: STORE_SIGNUP,
                variables: {
                  data: {
                    email: this.store.email,
                    password: this.store.password,
                  },
                },
              })

              token = response.data.storeSignup.accessToken

              if (token) {
                localStorage.setItem('storeToken', token)
                this.$router.push('/store/qr-reader')
              }
              break
            } else {
              alert('비밀번호가 일치하지 않습니다.')
              break
            }
          default:
            console.error('Login Type error : ', this.switchTab)
            return
        }
      } catch (error) {
        if (error.graphQLErrors[0]) {
          alert(error.graphQLErrors[0].message)
          return
        }
        console.error('GraphQL Error:', error)
        console.error('Network Error:', error.networkError)
      }
    },
    passwordMatches(password, passwordConfirmation) {
      if (password == passwordConfirmation) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>

<style scoped>
#switch-tab {
  display: flex;
}

header {
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  padding: 20px;
  background-color: #f8f9fa;
  border-bottom: 2px solid #ddd;
}

#signup-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

#switch-tab {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  border-bottom: 2px solid #ddd;
}

#switch-tab div {
  flex: 1;
  text-align: center;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #666;
  transition: all 0.3s ease;
}

#switch-tab div span.active {
  color: #007bff;
  border-bottom: 3px solid #007bff;
  padding-bottom: 5px;
}

#signup {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-top: 10px;
  display: block;
}

input {
  width: calc(100% - 1px);
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

#phone-number {
  display: flex;
  justify-content: space-between;
  gap: 5px;
  margin-top: 5px;
}

#phone-number input {
  width: 30%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>

<template>
  <header>
    <h2>식권모아</h2>
  </header>

  <div id="login-container">
    <div id="switch-tab">
      <div class="user-login">
        <span
          @click="switchTab('user-login')"
          :class="{ active: selectedTab === 'user-login'}"
        >유저 로그인</span>
      </div>

      <div class="company-login">
        <span
          @click="switchTab('company-login')"
          :class="{ active: selectedTab === 'company-login'}"
          >기업 로그인</span>
      </div>

      <div class="store-login">
        <span
          @click="switchTab('store-login')"
          :class="{ active: selectedTab === 'store-login'}"
        >상점 로그인</span>
      </div>
    </div>

    <form id="login" @submit.prevent="loginBtn">
      <div v-if="selectedTab === 'user-login'" class="user-login-input">
        <label for="user-email">유저 아이디</label>
        <input type="text" v-model="user.email" id="user-email" placeholder="이메일을 입력하세요." required>
        <label for="user-password">패스워드</label>
        <input type="password" v-model="user.password" id="user-password" placeholder="비밀번호를 입력하세요." required>
      </div>

      <div v-if="selectedTab === 'company-login'" class="company-login-input">
        <label for="company-email">기업 아이디</label>
        <input type="text" v-model="company.email" id="company-email" placeholder="이메일을 입력하세요." required>
        <label for="company-password">패스워드</label>
        <input type="password" v-model="company.password" id="company-password" placeholder="비밀번호를 입력하세요." required>
      </div>

      <div v-if="selectedTab === 'store-login'" class="store-login-input">
        <label for="store-email">상점 아이디</label>
        <input type="text" v-model="store.email" id="store-email" placeholder="이메일을 입력하세요." required>
        <label for="store-password">패스워드</label>
        <input type="password" v-model="store.password" id="store-password" placeholder="비밀번호를 입력하세요." required>
      </div>

      <button type="submit">로그인</button>
    </form>

    <div id="links-container">
      <a href="#">아이디/비밀번호 찾기</a>
      <a href="#">회원가입</a>
    </div>


  </div>
</template>

<script>
import { COMPANY_SIGNIN, STORE_SIGNIN, USER_SIGNIN } from '@/graphql';

export default {
  name: '',
  data() {
    return {
      selectedTab: 'user-login',
      user: {
        email: '',
        password: ''
      },
      company: {
        email: '',
        password: ''
      },
      store: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    switchTab(tab) {
      this.selectedTab = tab;
    },
    async loginBtn() {
      let response;
      let token;

      try {
        switch (this.selectedTab) {
        case 'user-login':
          response = await this.$apollo.mutate({
            mutation: USER_SIGNIN,
            variables: {
              data: {
                email: this.user.email,
                password: this.user.password
              }
            }
          })

          token = response.data.userSignin.accessToken;

          if (token) {
            localStorage.setItem('userToken', token);
            this.$router.push('/user/coupons')
          }
          break;
        case 'company-login':
          response = await this.$apollo.mutate({
            mutation: COMPANY_SIGNIN,
            variables: {
              data: {
                email: this.company.email,
                password: this.company.password
              }
            }
          })

          token = response.data.companySignin.accessToken;

          if (token) {
            localStorage.setItem('companyToken', token);
            this.$router.push('/company/restaurant')
          }
          break;
        case 'store-login':
          response = await this.$apollo.mutate({
            mutation: STORE_SIGNIN,
            variables: {
              data: {
                email: this.store.email,
                password: this.store.password
              }
            }
          })

          token = response.data.storeSignin.accessToken;

          if (token) {
            localStorage.setItem('storeToken', token);
            this.$router.push('/store/qr-reader')
          }
          break;
        default:
          console.error('Login Type error : ', this.switchTab)
          return;
        }
      } catch (error) {
        if (error.graphQLErrors[0]) {
          alert(error.graphQLErrors[0].message);
          return;
        }
          console.error('GraphQL Error:', error);
          console.error('Network Error:', error.networkError);
      }
    }
  }
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

#login-container {
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

#login {
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

#links-container {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  font-size: 14px;
}

#links-container a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s;
}

#links-container a:hover {
  color: #0056b3;
}

</style>

<template>
  <div class="title-name">
    <h2>식권모아</h2>
  </div>
  <div>
    <div class="signup-container">
      <button class="signup-tab-btn" @click="signupPage">회원가입</button>
    </div>
    <div class="store-container">
      <button class="store-login-btn" @click="openStorePopup()">상점 로그인</button>
    </div>
    <div v-if="isStorePopupVisible" class="overlay" @click="closeStorePopup">
      <div class="store-popup" @click.stop>
        <form @submit.prevent="storeSubmit">
          <div>
            <label for="name">가게 이름</label>
            <input type="text" id="name" v-model="store.name" placeholder="상점 이름을 입력해주세요."/>
          </div>
          <div>
            <label for="password">비밀번호</label>
            <input type="password" id="password" v-model="store.password" placeholder="비밀번호를 입력해주세요."/>
          </div>
          <button type="submit">로그인</button>
          <button type="button" @click="closeStorePopup">닫기</button>
        </form>
      </div>
    </div>

    <div class="button-container">
      <button class="user-login-btn" @click="openPopup('user')">회원 로그인</button>
      <button class="company-login-btn" @click="openPopup('company')">기업 로그인</button>
    </div>


    <!-- 팝업 배경 -->
    <div v-if="isPopupVisible" class="overlay" @click="closePopup">
      <!-- 팝업창 -->
      <div class="popup" @click.stop>
        <h2>{{ popupType === 'user' ? '회원 로그인' : '기업 로그인' }}</h2>
        <form @submit.prevent="handleSubmit">
          <!-- 회원 로그인 -->
          <div v-if="popupType === 'user'">
            <label for="email">이메일</label>
            <input type="text" id="email" v-model="form.email" placeholder="이메일 입력" />
          </div>

          <!-- 기업 로그인: 사업자등록번호 -->
          <div v-if="popupType === 'company'">
            <label for="registrationNumber">사업자등록번호</label>
            <input type="text" id="registrationNumber" v-model="form.registrationNumber" placeholder="사업자등록번호 입력" />
          </div>

          <!-- 공통: 비밀번호 입력 -->
          <div v-if="popupType === 'user' || popupType === 'company'">
            <label for="password">비밀번호</label>
            <input type="password" id="password" v-model="form.password" placeholder="비밀번호 입력" />
          </div>

          <button type="submit">로그인</button>
          <button type="button" @click="closePopup">닫기</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { COMPANY_LOGIN, STORE_LOGIN, USER_LOGIN } from '@/graphql';

export default {
  data() {
    return {
      isPopupVisible: false,
      isStorePopupVisible: false,
      popupType: '',
      form: {
        email: '',
        password: 'Test1234@',
        registrationNumber: '123-456',
      },
      store: {
        name: '',
        password: '',
      }
    };
  },
  methods: {
    openPopup(type) {
      this.popupType = type;
      this.isPopupVisible = true;
    },
    openStorePopup() {
      this.isStorePopupVisible = true;
    },
    closePopup() {
      this.isPopupVisible = false;
      this.form = { email: '', password: '', registrationNumber: '' };
    },
    closeStorePopup() {
      this.isStorePopupVisible = false;
      this.store = { name: '', password: '' }
    },
    signupPage() {
      this.$router.push('/signup')
    },
    async handleSubmit() {
      try {
        let token;

        if (this.popupType === 'company') {
          if (!this.form.registrationNumber) {
            alert('사업자등록번호를 입력해주세요.');
            return;
          }

          const { data } = await this.$apollo.mutate({
            mutation: COMPANY_LOGIN,
            variables: {
              data: {
                registrationNumber: this.form.registrationNumber,
                password: this.form.password
              }
            }
          })

          token = data.signin.accessToken;        

          if (token) {
            localStorage.setItem('companyToken', token);
            this.$router.push('/company/restaurant')
          }
        } else if (this.popupType === 'user') {
          const { data } = await this.$apollo.mutate({
            mutation: USER_LOGIN,
            variables: {
              data: {
                email: this.form.email,
                password: this.form.password
              }
            }
          })

          token = data.userSignin.accessToken;

          if (token) {
            localStorage.setItem('userToken', token);
            this.$router.push('/user/coupons')
          }
        }



      } catch (error) {
        alert('로그인 정보가 일치하지 않습니다.');
        console.log(error);
      }
    },
    async storeSubmit() {
      try {
        let token;
        const { data } = await this.$apollo.mutate({
          mutation: STORE_LOGIN,
          variables: {
            data: {
              name: this.store.name,
              password: this.store.password
            }
          }
        })

        token = data.storeSignin.accessToken;

        if (token) {
          localStorage.setItem('storeToken', token);
          this.$router.push('/store/qr-reader')
        }
      } catch (error) {
        alert('로그인 정보가 일치하지 않습니다.')
        console.log(error)
      }
    }
  },
};
</script>

<style scoped>
.title-name {
  text-align: center;
  font-size: 15px;
}
.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  gap: 50px;
}

.user-login-btn {
  width: 250px;
  height: 250px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  font-size: 16px;
  cursor: pointer;
}

.user-login-btn:hover {
  background-color: darkblue;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.5);
}

.company-login-btn {
  width: 250px;
  height: 250px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  font-size: 16px;
  cursor: pointer;
}

.company-login-btn:hover {
  background-color: darkgreen;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.5);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

.store-popup {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 500px;
  text-align: center;
}
.store-popup h2 {
  margin-bottom: 20px;
}

.popup h2 {
  margin-bottom: 20px;
}

.popup form div {
  margin-bottom: 15px;
}

.store-popup form div {
  margin-bottom: 15px;
}

.popup input {
  width: 80%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.store-popup input {
  width: 80%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.popup button {
  margin: 5px;
  padding: 10px 15px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.store-popup button {
  margin: 5px;
  padding: 10px 15px;
  font-size: 14px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.popup button[type="submit"] {
  background-color: #4caf50;
  color: white;   
}

.popup button[type="button"] {
  background-color: #f44336;
  color: white;
}

.store-popup button[type="submit"] {
  background-color: #4caf50;
  color: white;   
}

.store-popup button[type="button"] {
  background-color: #f44336;
  color: white;
}
.signup-container, .store-container {
  text-align: center;
  margin-top: 20px;
}
.signup-tab-btn, .store-login-btn {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  background-color: #f39c12;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}
.signup-tab-btn:hover, .store-login-btn {
  background-color: #d35400;
}
</style>

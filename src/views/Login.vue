<template>
  <div class="title-name">
    <h2>식권모아</h2>
  </div>
  <div>
    <!-- 버튼 -->
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
import { COMPANY_LOGIN, USER_LOGIN } from '@/graphql';
import { useMutation } from '@vue/apollo-composable';  // @vue/apollo-composable에서 useMutation을 가져옵니다.
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // 라우터 임포트

export default {
  data() {
    return {
      isPopupVisible: false, // 팝업 표시 여부
      popupType: '', // 팝업 유형 ('user' 또는 'company')
      form: {
        email: '',
        password: '',
        registrationNumber: '', // 기업 로그인용 추가 데이터
      },
    };
  },
  methods: {
    openPopup(type) {
      this.popupType = type; // 팝업 타입 설정
      this.isPopupVisible = true; // 팝업 열기
    },
    closePopup() {
      this.isPopupVisible = false; // 팝업 닫기
      this.form = { email: '', password: '', registrationNumber: '' }; // 폼 초기화
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

          token = data.signin.accessToken; // 기업 로그인 후 받은 토큰          

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

          token = data.userSignin.accessToken; // 기업 로그인 후 받은 토큰

          if (token) {
            localStorage.setItem('userToken', token);
            this.$router.push('/company/restaurant')
          }
        }



      } catch (error) {
        alert('로그인 정보가 일치하지 않습니다.');
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
    .title-name {
        text-align: center;
        font-size: 15px;
    }
    .button-container {
        display: flex; /* 버튼을 가로로 배치 */
        justify-content: center; /* 버튼을 가로 방향 중앙 정렬 */
        align-items: center; /* 버튼을 세로 방향 중앙 정렬 */
        height: 100vh; /* 화면 전체 높이 */
        gap: 50px; /* 버튼 사이 간격 */
    }

    /* 회원 로그인 버튼 스타일 */
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

    /* 기업 로그인 버튼 스타일 */
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

    /* 팝업 배경 (흐림 효과) */
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

    /* 팝업창 스타일 */
    .popup {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        width: 300px;
        text-align: center;
    }

    .popup h2 {
        margin-bottom: 20px;
    }

    .popup form div {
        margin-bottom: 15px;
    }

    .popup input {
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

    .popup button[type="submit"] {
        background-color: #4caf50;
        color: white;   
    }

    .popup button[type="button"] {
        background-color: #f44336;
        color: white;
    }
</style>

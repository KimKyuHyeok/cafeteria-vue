<script setup>
import { ref } from 'vue';

// 팝업 상태 및 데이터
const isPopupVisible = ref(false); // 팝업 표시 여부
const popupType = ref(''); // 팝업 유형 ('member' 또는 'company')
const form = ref({
  username: '',
  password: '',
});

// 팝업 열기
const openPopup = (type) => {
  popupType.value = type; // 팝업 타입 설정
  isPopupVisible.value = true; // 팝업 열기
};

// 팝업 닫기
const closePopup = () => {
  isPopupVisible.value = false; // 팝업 닫기
  form.value = { username: '', password: '' }; // 폼 초기화
};

// 로그인 처리
const handleSubmit = () => {
  console.log('로그인 요청:', form.value); // 폼 데이터 출력 (API 연동 가능)
  closePopup(); // 팝업 닫기
};
</script>

<template>
    <div>
      <!-- 버튼 -->
      <button @click="openPopup('member')">회원 로그인</button>
      <button @click="openPopup('company')">기업 로그인</button>
  
      <!-- 팝업 배경 -->
      <div v-if="isPopupVisible" class="overlay" @click="closePopup">
        <!-- 팝업창 -->
        <div class="popup" @click.stop>
          <h2>{{ popupType === 'member' ? '회원 로그인' : '기업 로그인' }}</h2>
          <form @submit.prevent="handleSubmit">
            <div>
              <label for="username">아이디</label>
              <input type="text" id="username" v-model="form.username" />
            </div>
            <div>
              <label for="password">비밀번호</label>
              <input type="password" id="password" v-model="form.password" />
            </div>
            <button type="submit">로그인</button>
            <button type="button" @click="closePopup">닫기</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  

<style scoped>
/* 버튼 스타일 */
button {
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

/* 팝업 배경 (흐림 효과) */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 효과 */
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
  width: 100%;
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

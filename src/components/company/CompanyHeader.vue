<template>
  <header class="header">
    <div class="logo">
      <h1>식권모아</h1>
      <button class="menu-button" @click="toggleMenu">☰</button>
    </div>
    <nav class="menu" :class="{ open: isMenuOpen }">
      <button class="close-button" @click="toggleMenu">✕</button>
      <ul>
        <li><a href="/company/restaurant">식당찾기</a></li>
        <li><a href="/company/coupon">식권관리</a></li>
        <li><a href="/company/user">회원관리</a></li>
        <li><a href="/company/payment-history">결제내역</a></li>
        <li><button class="logout-button" @click="logout">로그아웃</button></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// 로그아웃
const logout = () => {
  alert('로그아웃 되었습니다!')
  localStorage.removeItem('companyToken')
  window.location.href = '/login'
}
</script>

<style scoped>
/* 기본 헤더 스타일 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: white;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
}

.menu ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu li {
  margin: 0 15px;
}

.menu a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.menu a:hover {
  color: #00bcd4;
}

.logout-button {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

.logout-button:hover {
  color: #f44336;
}

/* 모바일 스타일 */
@media (max-width: 768px) {
  .logo {
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: bold;
    width: 100%;
    justify-content: space-between;
  }

  /* 메뉴 버튼 (햄버거 아이콘) */
  .menu-button {
    background: none;
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    display: block; /* 모바일에서만 보이도록 설정 */
  }

  /* 사이드 메뉴 스타일 */
  .menu {
    position: fixed;
    top: 0;
    right: -250px;
    width: 250px;
    height: 100%;
    background: #444;
    transition: right 0.3s ease-in-out;
    padding-top: 60px;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .menu.open {
    right: 0;
  }

  /* 닫기 버튼 */
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    color: white;
    font-size: 20px;
    cursor: pointer;
    padding: 10px;
  }

  .close-button:hover {
    color: #f44336;
  }

  .menu ul {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    text-align: center;
    /* 모바일에서 세로로 정렬 */
    display: flex;
    flex-direction: column; /* 세로로 정렬 */
  }

  .menu li {
    padding: 15px;
    border-bottom: 1px solid #555;
  }

  .menu a {
    color: white;
    text-decoration: none;
    font-size: 18px;
    display: block;
    padding: 15px;
  }

  .menu a:hover {
    background: #555;
  }

  /* .close-button는 모바일에서만 보이도록 설정 */
  .close-button {
    display: block;
  }
}

/* 데스크탑 스타일 (768px 이상) */
@media (min-width: 769px) {
  .menu-button,
  .close-button {
    display: none; /* 데스크탑에서 버튼 숨기기 */
  }

  .menu {
    display: flex;
  }

  .menu ul {
    display: flex;
  }

  .menu li {
    margin: 0 15px;
  }
}
</style>

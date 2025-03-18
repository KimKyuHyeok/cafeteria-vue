<template>
  <header class="header">
    <div class="logo">
      <h1>식권모아</h1>
      <button class="menu-button" @click="toggleMenu">☰</button>
    </div>
    <nav class="menu" :class="{ open: isMenuOpen }">
      <button class="close-button" @click="toggleMenu">닫기 ✕</button>
      <ul>
        <li><a href="/user/coupons">식권발급</a></li>
        <li><a href="/user/search-company">회사찾기</a></li>
        <li><a href="/user/my-page">내 정보</a></li>
        <li><a href="#" @click.prevent="logout">로그아웃</a></li>
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
  localStorage.removeItem('userToken')
  window.location.href = '/login'
}
</script>

<style scoped>
/* 헤더 스타일 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: white;
  padding: 10px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
}

/* 로고와 메뉴 버튼 */
.logo {
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  width: 100%;
  justify-content: space-between;
}

.menu-button {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
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
</style>

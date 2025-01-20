<template>
    <header class="header">
      <div class="logo"><h1>식권모아</h1></div>
      <nav class="menu">
        <ul>
          <li><a href="/user/coupons">식권발급</a></li>
          <li><a href="/user/company">회사찾기</a></li>
          <li><button @click="logout">로그아웃</button></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script setup>
  // 로그아웃
  const logout = () => {
    alert('로그아웃 되었습니다!');
    localStorage.removeItem('userToken');
    window.location.href = '/login';
  };
  </script>
  
  <style scoped>
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
  
  .menu button {
    background: none;
    border: none;
    color: white;
    font-size: 16px;
    cursor: pointer;
  }
  
  .menu button:hover {
    color: #f44336;
  }
  </style>
  
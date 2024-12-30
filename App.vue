<script setup>
import SideMenu from '@/components/header/SideHeader.vue'
</script>

<template>
	<header id="header">
		<SideMenu></SideMenu>
	</header>
	<div id="app">
		<router-view />
	</div>
</template>

<style scoped>
#header {
	position: fixed;
	flex: 0 0 40%;
	width: 50vh;
	height: 100vh;
	display: flex;
	justify-content: center;
	border-right: 1px solid #ccc;
	background-image: url('http://kyuhyeok.site:8080/image/bg.jpg');
	background-size: cover;
	background-attachment: fixed;
	background-position: center;
}

#app {
	margin-left: 70vh;
}
</style>

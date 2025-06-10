<template>
  <div class="chat-container">
    <button class="back-button" @click="goBack">← 뒤로가기</button>
    <h2 class="chat-title">채팅방</h2>

    <div ref="chatBox" class="chat-box">
      <div v-for="(msg, i) in messages" :key="i" class="chat-message">
        <div class="message-header">
          <strong class="sender-name">{{ msg.senderName }}</strong>
          <span class="message-timestamp">{{ formatRelativeTime(msg.createdAt) }}</span>
        </div>
        <div class="message-content">{{ msg.content }}</div>
      </div>
    </div>

    <div class="input-area">
      <input v-model="newMessage" placeholder="메시지를 입력하세요" class="message-input" @keyup.enter="sendMessage" />
      <button class="send-button" @click="sendMessage">전송</button>
    </div>
  </div>
</template>

<script setup>
import socket from '@/config/socket'
import { onMounted, onUnmounted, ref, nextTick } from 'vue'

const messages = ref([])
const newMessage = ref('')
const chatBox = ref(null)

const goBack = () => {
  window.history.back()
}

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  socket.emit('sendMessage', newMessage.value)
  newMessage.value = ''
}

const formatRelativeTime = (createdAt) => {
  const now = new Date()
  const past = new Date(createdAt)
  const diffMs = now - past

  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  const rtf = new Intl.RelativeTimeFormat('ko', { numeric: 'auto' })

  if (days > 0) return rtf.format(-days, 'day')
  if (hours > 0) return rtf.format(-hours, 'hour')
  if (minutes > 0) return rtf.format(-minutes, 'minute')
  return '방금 전'
}

onMounted(() => {
  socket.connect()

  socket.on('previousMessages', (prevMsgs) => {
    messages.value = prevMsgs
    nextTick(() => scrollToBottom())
  })

  socket.on('newMessage', (msg) => {
    messages.value.push(msg)
    nextTick(() => scrollToBottom())
  })
})

onUnmounted(() => {
  socket.disconnect()
})

const scrollToBottom = () => {
  if (chatBox.value) {
    chatBox.value.scrollTop = chatBox.value.scrollHeight
  }
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem;
  box-sizing: border-box;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
}

.back-button {
  background: none;
  border: none;
  color: #007bff;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.25rem 0;
  margin-bottom: 0.5rem;
  text-align: left;
}

.back-button:hover {
  text-decoration: underline;
}

.chat-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.chat-box {
  flex: 1;
  overflow-y: auto;
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.chat-message {
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.sender-name {
  font-weight: bold;
}

.message-timestamp {
  font-size: 0.75rem;
  color: #999;
  white-space: nowrap;
}

.message-content {
  font-size: 1rem;
}

.input-area {
  display: flex;
  margin-top: 1rem;
}

.message-input {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

.send-button {
  margin-left: 0.5rem;
  padding: 0.75rem 1.25rem;
  background-color: #007bff;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.send-button:hover {
  background-color: #0056b3;
}
</style>

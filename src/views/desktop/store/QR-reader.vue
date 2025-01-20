<template>
  <div v-if="isMobile" class="qr-reader-container">
    <h1>QR 코드 스캔</h1>
    <qrcode-stream @decode="onDecode" @init="onInit" />
    <p v-if="decodedText">스캔 결과: {{ decodedText }}</p>
  </div>
  <div v-else>
    <h1>모바일에서만 QR 코드 스캔 기능을 사용할 수 있습니다.</h1>
  </div>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";

export default {
  name: 'QRcodeReaderVue',
  components: {
    QrcodeStream,
  },
  data() {
    return {
      decodedText: "", // QR 코드 스캔 결과
      isMobile: false,  // 모바일 여부
    };
  },
  mounted() {
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  },
  methods: {
    onDecode(content) {
      this.decodedText = content;

      this.validateQrCode(content);
    },
    onInit(promise) {
      promise
        .then(() => console.log("QR 스캐너가 초기화되었습니다."))
        .catch(error => console.error("QR 스캐너 초기화 실패:", error));
    },
    async validateQrCode(content) {
      try {
        const response = await this.$apollo.mutate({
          mutation: null,
          variables: { qrData: content },
        });
        console.log("QR 코드 검증 결과:", response.data);
      } catch (error) {
        console.error("QR 코드 검증 실패:", error);
      }
    },
  },
};
</script>

<style scoped>
.qr-reader-container {
  padding: 20px;
  text-align: center;
}

qrcode-stream {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
}

h1 {
  color: #333;
}
</style>

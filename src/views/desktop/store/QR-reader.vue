<template>
  <div v-if="isMobile" class="qr-reader-container">
    <h1>QR 코드 스캔</h1>
    <!-- qrcode-stream에 카메라 접근을 위한 constraints 추가 -->
    <qrcode-stream
      :constraints="videoConstraints"
      @decode="onDecode"
      @init="onInit"
    />
    <p v-if="decodedText">스캔 결과: {{ decodedText }}</p>
  </div>
  <div v-else>
    <h1>모바일에서만 QR 코드 스캔 기능을 사용할 수 있습니다.</h1>
  </div>
</template>

<script>
import { QRCODE_READER } from '@/graphql';
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
      videoConstraints: {
        facingMode: 'environment', // 후면 카메라 사용
        video: {
          width: { ideal: 1280 },   // 해상도 설정
          height: { ideal: 720 }
        }
      }
    };
  },
  mounted() {
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  },
  methods: {
    onDecode(content) {
      // QR 코드 스캔 성공
      this.decodedText = content;

      // 서버로 스캔 결과 전송
      this.validateQrCode(content);
    },
    onInit(promise) {
      // QR 코드 스캐너 초기화
      promise
        .then(() => console.log("QR 스캐너가 초기화되었습니다."))
        .catch(error => console.error("QR 스캐너 초기화 실패:", error));
    },
    async validateQrCode(content) {
      // 서버에 QR 코드 데이터 전송 및 검증
      try {
        const qrData = JSON.parse(content);
        alert("QR Data : ", qrData);

        const response = await this.$apollo.mutate({
          mutation: QRCODE_READER,
          variables: { qrData },
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
  height: 300px;  /* 카메라 화면의 크기 조정 */
  border: 1px solid #ccc;
}

h1 {
  color: #333;
}
</style>

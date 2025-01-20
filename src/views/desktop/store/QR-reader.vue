<template>
    <div class="qr-reader-container">
      <h1>QR 코드 스캔</h1>
      <qrcode-stream @decode="onDecode" @init="onInit" />
      <p v-if="decodedText">스캔 결과: {{ decodedText }}</p>
    </div>
  </template>
  
  <script>
  import { QrcodeStream } from "vue-qrcode-reader";
  
  export default {
    name:'QRcodeReaderVue',
    components: {
      QrcodeStream,
    },
    data() {
      return {
        decodedText: "", // QR 코드 스캔 결과
      };
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
  </style>
  
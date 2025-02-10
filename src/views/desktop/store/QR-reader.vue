<template>
  <store-header></store-header>
  <div class="qr-reader-container">
    <h1>QR 코드 스캔</h1>
    <div class="container">
      <qrcode-stream
        :track="trackFunction"
        :constraints="selectedConstraints"
        :formats="['qr_code']"
        @detect="onDetect"
        @error="onError"
        @camera-on="onCameraOn"
      />
    </div>
    <p v-if="error" style="color: red">{{ error }}</p>
    <p>스캔 결과: {{ decodedText }}</p>
  </div>
</template>

<script>
import { QrcodeStream } from 'vue-qrcode-reader'
import { QRCODE_READER } from '@/graphql'
import StoreHeader from '@/components/desktop/store/StoreHeader.vue'

export default {
  components: {
    QrcodeStream,
    StoreHeader
  },
  data() {
    return {
      decodedText: '',
      error: '',
      isMobile: false,
      selectedConstraints: {
        facingMode: 'environment',
        width: { min: 360, ideal: 640, max: 1920 },
        height: { min: 360, ideal: 640, max: 1080 },
      },
    }
  },
  mounted() {
    console.log('컴포넌트 마운트됨')
  },
  methods: {
    async onCameraOn(capabilities) {
      this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

      try {
        const permissions = await navigator.permissions.query({ name: 'camera' })
        console.log('카메라 권한 상태:', permissions.state)
        console.log('카메라 기능:', capabilities)
      } catch (err) {
        console.error('카메라 권한 체크 실패:', err)
        this.error = '카메라 접근 권한을 확인해주세요.'
      }
    },
    async onDetect(detectedCodes) {
      try {
        if (!detectedCodes || detectedCodes.length === 0) return

        const qrContent = detectedCodes[0].rawValue
        console.log('감지된 QR 코드 내용:', qrContent)

        if (qrContent) {
          this.decodedText = qrContent
          this.speakText('확인되었습니다.')
          await this.validateQrCode(qrContent)

          this.decodedText = ''
        }
      } catch (error) {
        console.error(error)
      }
    },
    speakText(text) {
      if (!window.speechSynthesis) {
        console.warn('브라우저가 음성을 지원하지 않습니다.')
        return
      }

      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'ko-KR'
      window.speechSynthesis.speak(utterance)
    }
    ,
    onError(err) {
      this.error = `[${err.name}]: `
      switch (err.name) {
        case 'NotAllowedError':
          this.error += '카메라 접근 권한을 허용해주세요.'
          break
        case 'NotFoundError':
          this.error += '이 기기에서 사용 가능한 카메라를 찾을 수 없습니다.'
          break
        case 'NotSupportedError':
          this.error += '보안 연결이 필요합니다. (HTTPS 또는 localhost 사용)'
          break
        case 'NotReadableError':
          this.error += '카메라가 이미 사용 중인지 확인해주세요.'
          break
        case 'OverconstrainedError':
          this.error += '설치된 카메라가 요구사항과 맞지 않습니다.'
          break
        case 'StreamApiNotSupportedError':
          this.error += '이 브라우저에서는 Stream API를 지원하지 않습니다.'
          break
        case 'InsecureContextError':
          this.error += '카메라 접근은 보안 연결에서만 허용됩니다. HTTPS 또는 localhost를 사용해주세요.'
          break
        default:
          this.error += err.message
      }
    },
    trackFunction(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

        ctx.strokeStyle = 'red'
        ctx.lineWidth = 3

        ctx.beginPath()
        ctx.moveTo(firstPoint.x, firstPoint.y)
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y)
        }
        ctx.lineTo(firstPoint.x, firstPoint.y)
        ctx.closePath()
        ctx.stroke()
      }
    },
    async validateQrCode(content) {
      try {

        // JSON 문자열을 객체로 파싱
        const qrData = JSON.parse(content);
        
        // couponId 값을 Int로 변환
        qrData.couponId = parseInt(qrData.couponId);

        const { data } = await this.$apollo.mutate({
          mutation: QRCODE_READER,
          variables: { qrData },
        })
        console.log('QR 코드 검증 결과:', data.couponUse)
      } catch (error) {
        console.error('QR 코드 검증 실패:', error)
      }
    },
  },
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  width: 640px;
  height: 640px;
}
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

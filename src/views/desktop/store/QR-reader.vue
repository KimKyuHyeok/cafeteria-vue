<template>
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

<script setup>
// Import
import { ref, onMounted } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import { useApolloClient } from '@vue/apollo-composable'
import { QRCODE_READER } from '@/graphql'

// 변수 선언부
const { mutate } = useApolloClient()
const decodedText = ref('')
const error = ref('')
const isMobile = ref(false)

// 카메라 설정
const selectedConstraints = ref({
	facingMode: 'environment',
	width: { min: 360, ideal: 640, max: 1920 },
	height: { min: 360, ideal: 640, max: 1080 },
})

// Vue 라이프 사이클(컴포넌트가 마운트된 후 밑에 내용들 실행)
onMounted(async () => {
	console.log('컴포넌트 마운트됨')
})

/**
 * 카메라 초기화 완료시 호출되는 이벤트 핸들러
 * @param {MediaTrackCapabilities} capabilities - 카메라의 기능 정보를 포함하는 객체
 * - MediaTrackCapabilities는 카메라의 세부적인 기능과 제약사항 정보를 포함
 * - torch: 플래시 지원 여부
 * - facingMode: 전면/후면 카메라 지원
 * - frameRate: 지원 프레임률 범위
 * - aspectRatio: 지원 화면비율
 * - width/height: 지원 해상도 범위
 */
const onCameraOn = async (capabilities) => {
	// 모바일 기기 체크
	isMobile.value = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

	try {
		// 카메라 권한 상태 확인
		const permissions = await navigator.permissions.query({ name: 'camera' })
		console.log('카메라 권한 상태:', permissions.state)
		console.log('카메라 기능:', capabilities) // 카메라의 세부 기능 정보 확인
	} catch (err) {
		console.error('카메라 권한 체크 실패:', err)
		error.value = '카메라 접근 권한을 확인해주세요.'
	}
}

/**
 * QR 코드 감지 처리 함수
 * @param {DetectedBarcode[]} detectedCodes - 감지된 QR 코드 배열
 * @description 감지된 QR 코드의 rawValue를 추출하여 화면에 표시하고 서버 검증을 수행
 */
const onDetect = async (detectedCodes) => {
	if (!detectedCodes || detectedCodes.length === 0) return

	const qrContent = detectedCodes[0].rawValue
	console.log('감지된 QR 코드 내용:', qrContent)

	if (qrContent) {
		// 스캔결과 표시
		decodedText.value = qrContent
		// QR 코드 데이터 서버 검증
		await validateQrCode(qrContent)
	}
}
/**
 * QR 스캐너 에러 처리 함수
 * @param {Error} err - 발생한 에러 객체
 * @description 다양한 카메라 관련 에러 상황에 대한 사용자 친화적 메시지 표시
 * - NotAllowedError: 카메라 접근 권한 거부
 * - NotFoundError: 카메라 장치 없음
 * - NotSupportedError: HTTPS 필요
 * - NotReadableError: 카메라 사용 중
 * - OverconstrainedError: 부적절한 카메라
 * - StreamApiNotSupportedError: Stream API 미지원
 * - InsecureContextError: 보안 컨텍스트 필요
 */
const onError = (err) => {
	error.value = `[${err.name}]: `

	if (err.name === 'NotAllowedError') {
		error.value += '카메라 접근 권한을 허용해주세요.'
	} else if (err.name === 'NotFoundError') {
		error.value += '이 기기에서 사용 가능한 카메라를 찾을 수 없습니다.'
	} else if (err.name === 'NotSupportedError') {
		error.value += '보안 연결이 필요합니다. (HTTPS 또는 localhost 사용)'
	} else if (err.name === 'NotReadableError') {
		error.value += '카메라가 이미 사용 중인지 확인해주세요.'
	} else if (err.name === 'OverconstrainedError') {
		error.value += '설치된 카메라가 요구사항과 맞지 않습니다.'
	} else if (err.name === 'StreamApiNotSupportedError') {
		error.value += '이 브라우저에서는 Stream API를 지원하지 않습니다.'
	} else if (err.name === 'InsecureContextError') {
		error.value += '카메라 접근은 보안 연결에서만 허용됩니다. HTTPS 또는 localhost를 사용해주세요.'
	} else {
		error.value += err.message
	}
}
/**
 * QR 코드 시각적 표시 함수
 * @param {DetectedBarcode[]} detectedCodes - 감지된 QR 코드 배열
 * @param {CanvasRenderingContext2D} ctx - 캔버스 렌더링 컨텍스트
 * @description 카메라 스트림 위에 감지된 QR 코드 위치를 빨간색 테두리로 표시
 */
const trackFunction = (detectedCodes, ctx) => {
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
}

/**
 * QR 코드 데이터 서버 검증 함수
 * @param {string} content - QR 코드에서 읽은 데이터
 * @description QR 코드 데이터를 파싱하여 GraphQL mutation으로 서버 검증 수행
 * @throws {Error} JSON 파싱 실패 또는 서버 통신 실패시 에러 발생
 */
const validateQrCode = async (content) => {
	try {
		const qrData = JSON.parse(content)
		console.log('QR Data : ', qrData)
		const { data } = await mutate({
			mutation: QRCODE_READER,
			variables: { qrData },
		})
		console.log('QR 코드 검증 결과:', data.couponUse)
	} catch (error) {
		console.error('QR 코드 검증 실패:', error)
	}
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

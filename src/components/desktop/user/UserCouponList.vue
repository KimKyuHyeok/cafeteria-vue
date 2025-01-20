<template>
    <div class="coupon-list-container">
        <h1>잔여 쿠폰 목록</h1>
        <div id="coupon-list">
            <div v-for="coupon in coupons" :key="coupon.id" class="coupon-item">
            <h3>{{ coupon.name }}</h3>
            <p>{{ coupon.address }}</p>
            <p>잔여 수량: {{ coupon.coupon[0].count }}</p>
            <button @click="useCoupon(coupon.coupon[0].restaurantId, coupon.coupon[0].companyId)" class="use-btn">사용 QR 발급하기</button>
        </div>
        </div>
    </div>

    <div v-if="showModal" class="qr-modal-overlay" @click="closeModal">
        <div class="qr-modal" @click.stop>
            <h3>입장 QR 코드</h3>
            <img :src="qrUrl" alt="QR Code" />
            <button @click="closeModal" class="close-btn">취소</button>
        </div>
    </div>
</template>

<script>
import { GENERATE_QRCODE, GET_COUPONS_BY_USER } from '@/graphql';

export default {
    data() {
        return {
            coupons: [],
            qrUrl: '',
            showModal: false,
        }
    },
    methods: {
        async couponFindByUserId() {
            const { data } = await this.$apollo.query({
                query: GET_COUPONS_BY_USER
            });

            this.coupons = data.couponsFindByUserId
        },

        async useCoupon(restaurantId, companyId) {
            const dto = {
                restaurantId,
                companyId
            }

            const { data } = await this.$apollo.query({
                query: GENERATE_QRCODE,
                variables: { data: dto }
            })

            this.qrUrl = data.generateQrCode.url;
            this.showModal = true;
        },

        closeModal() {
            this.showModal = false;
        }
    },
    mounted() {
        this.couponFindByUserId();
    }
}

</script>

<style scoped>

.coupon-list-container {
    padding: 20px;
}
  
.coupon-list {
    display: grid;
    margin-top: 10px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
}
  
.coupon-item {
    border: 1px solid #ccc;
    padding: 10px;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.coupon-item h3 {
    margin: 0 0 10px;
    font-size: 18px;
}

.coupon-item p {
    margin: 0;
    color: #555;
}

.use-btn {
  background-color: #007bff; /* 밝고 선명한 푸른색 */
  color: #ffffff; /* 텍스트 색상 */
  border: none; /* 테두리 제거 */
  border-radius: 5px; /* 둥근 모서리 */
  padding: 10px 20px; /* 안쪽 여백 */
  font-size: 16px; /* 글씨 크기 */
  font-weight: bold; /* 글씨 두께 */
  cursor: pointer; /* 마우스 커서를 포인터로 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 약간의 그림자 */
  transition: background-color 0.3s ease, transform 0.2s ease; /* 부드러운 색상 및 크기 변화 */
}

.use-btn:hover {
  background-color: #0056b3; /* 어두운 푸른색으로 변경 */
  transform: scale(1.05); /* 살짝 커짐 */
}

.use-btn:active {
  background-color: #004494; /* 더 어두운 푸른색 */
  transform: scale(0.95); /* 살짝 작아짐 */
}

.use-btn:focus {
  outline: none; /* 기본 포커스 제거 */
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5); /* 외곽선 강조 */
}

.qr-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7); /* 더 어두운 배경 */
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(10px); /* 배경 흐림 */
    z-index: 999;
}

/* QR 코드 팝업 */
.qr-modal {
    background: white;
    padding: 30px;
    border-radius: 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.qr-modal img {
    max-width: 500px; /* QR 이미지 크기 증가 */
    max-height: 500px; /* QR 이미지 크기 증가 */
    margin-bottom: 30px; /* 버튼과 이미지 간격 */
}

.close-btn {
    background-color: #ff3b30;
    color: white;
    padding: 15px 30px; /* 버튼 크기 증가 */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px; /* 버튼 글씨 크기 증가 */
}

.close-btn:hover {
    background-color: #ff1a1a;
}
</style>

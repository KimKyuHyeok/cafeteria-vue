import QRcodeReaderVue from '@/views/desktop/store/QR-reader.vue'

const storeRoutes = [
    {
        path: '/store/qr-reader',
        name: 'QRcodeReaderVue',
        component: QRcodeReaderVue,
        meta: { requiresAuth: true }
    }
]


export default storeRoutes
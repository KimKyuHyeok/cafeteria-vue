import { io } from 'socket.io-client'

const socket = io('http://www.siggwon-moa.shop/', {
    transports: ['websocket'],
    auth: {
        token: {
            userToken: localStorage.getItem('userToken'),
            companyToken: localStorage.getItem('companyToken')
        }
    }
})

export default socket;
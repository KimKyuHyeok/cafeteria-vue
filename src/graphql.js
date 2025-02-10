import { gql } from "@apollo/client";

export const COMPANY_LOGIN = gql`
    mutation signin($data: CompanySigninInput!) {
        signin(data: $data) {
        accessToken
        refreshToken
        }
    }
`

export const USER_LOGIN = gql`
    mutation userSignin($data: UserSigninInput!) {
        userSignin(data: $data) {
            accessToken
            refreshToken
        }
    }
`

export const STORE_LOGIN = gql`
    mutation storeSignin($data: StoreInput!) {
        storeSignin(data: $data) {
            accessToken
            refreshToken
        }
    }
`

export const COMPANY_SIGNUP = gql`
    mutation signup($data: CompanySignupInput!) {
        signup(data: $data) {
            accessToken
        }
    }
`

export const USER_SIGNUP = gql`
    mutation userSignup($data: UserSignupInput!) {
        userSignup(data: $data) {
            accessToken
        }
    }
`

export const GET_COUPONS = gql`
    query {
        couponsFindByCompanyId {
            id
            name
            address
            coupon {
                count
                companyId
                restaurantId
            }
        }
    }
`

export const GET_COUPONS_BY_USER = gql`
query {
    couponsFindByUserId {
        id
        name
        address
        coupon {
            count
            companyId
            restaurantId
        }
    }
}
`

export const GET_RESTAURANTS = gql`
    query restaurantFindByAddress($keyword: String!) {
        restaurantFindByAddress(keyword: $keyword) {
            id
            name
            address
            price
        } 
    } 
`

export const GET_USERS_APPROVED = gql`
    query {
        userWithCompanyListByApproved {
            id
            name
            phoneNumber
            email
            status
            createdAt
            updatedAt
            companyUserId
        }
    }
`

export const GET_USERS_PENDING = gql`
    query {
        userWithCompanyListByPending {
            id
            name
            phoneNumber
            email
            status
            createdAt
            updatedAt
            companyUserId
        }
    }
`

export const GET_USERS_REJECTED = gql`
    query {
        userWithCompanyListByRejected {
            id
            name
            phoneNumber
            email
            status
            createdAt
            updatedAt
            companyUserId
        }
    }

`

export const APPROVED_USER = gql`
    mutation userApproved($data: CompanyJoinRequestDto!) {
        userApproved(data: $data) {
            success
            message
        }
    }
`

export const REJECTED_USER = gql`
    mutation userRejected($data: CompanyJoinRequestDto!) {
        userRejected(data: $data) {
            success
            message
        }
    }
`

export const DELETE_USER = gql`
    mutation userCompanyDelete($data: CompanyUserDto!) {
        userCompanyDelete(data: $data) {
            success
            message
        }
    }
`

export const GENERATE_QRCODE = gql`
    query generateQrCode($data: CouponUseDto!) {
        generateQrCode(data: $data) {
            url
        }
    }
`

export const FIND_COMPANY_LIST = gql`
    query companyListSearch($keyword: String!) {
        companyListSearch(keyword: $keyword) {
            id
            name
            registrationNumber
        }
    }
`

export const COMPANY_USER_JOIN_REQUEST = gql`
    mutation CompanyUserJoinRequest($data: CompanyUserJoinRequestDto!) {
        companyUserJoinRequest(data: $data) {
            success
            message
        }
    }
`

export const SELECT_PAYMENTS = gql`
    query {
        selectPayments {
            orderId
            amount
            paymentDate
        }
    }
`

export const QRCODE_READER = gql`
    mutation couponUse($qrData: QrDataDto!) {
        couponUse(qrData: $qrData) {
            success
            message
        }
    }
`

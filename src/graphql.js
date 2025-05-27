import { gql } from '@apollo/client'

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

// refactor

export const USER_SIGNIN = gql`
  mutation userSignin($data: UserSigninInput!) {
    userSignin(data: $data) {
      accessToken
      refreshToken
    }
  }
`

export const USER_SIGNUP = gql`
  mutation userSignup($data: UserSignupInput!) {
    userSignup(data: $data) {
      accessToken
      refreshToken
    }
  }
`

export const COMPANY_SIGNIN = gql`
  mutation companySignin($data: CompanySigninInput!) {
    companySignin(data: $data) {
      accessToken
      refreshToken
    }
  }
`

export const COMPANY_SIGNUP = gql`
  mutation companySignup($data: CompanySignupInput!) {
    companySignup(data: $data) {
      accessToken
      refreshToken
    }
  }
`

export const STORE_SIGNIN = gql`
  mutation storeSignin($data: StoreSigninInput!) {
    storeSignin(data: $data) {
      accessToken
      refreshToken
    }
  }
`

export const STORE_SIGNUP = gql`
  mutation storeSignup($data: StoreSignupInput!) {
    storeSignup(data: $data) {
      accessToken
      refreshToken
    }
  }
`

export const COMPANY_NAME_SEARCH = gql`
  query companyListSearch($data: CompanySearchInput!) {
    companyListSearch(data: $data) {
      companies {
        id
        companyName
        registrationNumber
      }
      totalCount
    }
  }
`

export const USER_INFO_SELECT = gql`
  query {
    myPageInfoSelect {
      userInfo {
        name
        email
        phoneNumber
      }
      companyUserInfo {
        companyUserId
        companyName
        status
      }
    }
  }
`

export const USER_INFO_UPDATE = gql`
  mutation myPageInfoUpdate($data: UserInfoUpdateInput!) {
    myPageInfoUpdate(data: $data) {
      success
      message
    }
  }
`

export const VALIDATE_USER_TOKEN = gql`
  query {
    isValidateUser
  }
`

export const GET_KAKAO_AUTH_URL = gql`
  query {
    getKakaoAuthUrl
  }
`

export const LOGIN_WITH_KAKAO = gql`
  mutation LoginWithKakao($code: String!) {
    loginWithKakao(code: $code) {
      isRegistered
      accessToken
      refreshToken
      username
    }
  }
`

export const SIGNUP_WITH_KAKAO = gql`
  mutation SignupWithKakao($data: AuthSignupDto!) {
    signupWithKakao(data: $data) {
      isRegistered
      accessToken
      refreshToken
    }
  }
`

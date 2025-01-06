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
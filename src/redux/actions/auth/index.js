// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'
import axios from "axios"
import {toast} from "react-toastify"
import { config as server } from '@src/config'
import {history} from "../../../utility/Utils"
import { axiosInstance } from '../../../utility/api'
import { saveUserDetailsAction } from './actions'

const config = useJwt.jwtConfig


function fetchUserInformation() {
    return axiosInstance().get('/auth/userDetails')
  }

// ** Handle User Login
export const handleLogin = data => {
    return dispatch => {
        return axios.post(`${server.server.apiURL}auth/login`, data).then(response => {
            dispatch({
                type: 'LOGIN',
                [config.storageTokenKeyName]: response.data.access_token
            })

            localStorage.setItem('token', response.data.access_token)
            history.push('/home')
        }).catch(error => {
            console.log(error)
            //toast.error(error.response.data.message)
        })
    }
}


// ** Handle User Register
export const handleRegister = data => {
    return dispatch => {
        return axios.post(`${server.server.apiURL}auth/register`, data).then(response => {
            

            history.push('/verification')
        }).catch(error => {
            console.log(error)
            toast.error(error.response.data.message)
        })
    }
}


// ** Handle User Verfication
export const handleVerification = data => {
    return dispatch => {
        return axios.post(`${server.server.apiURL}auth/verifyCode`, data).then(response => {
            

            history.push('/login')
            toast.success('Account verified successfully!!')
        }).catch(error => {
            console.log(error)
            toast.error(error.response.data.message)
        })
    }
}

// ** Handle User information
export const handleUserInformation = data => {
    return async (dispatch) => {
        try {
            const userResponse = await fetchUserInformation()
            dispatch(saveUserDetailsAction(userResponse.data))
        } catch (e) {
            toast.error(e)
        }
    }
}


// ** Handle User Logout
export const handleLogout = () => {
    return dispatch => {
        dispatch({type: 'LOGOUT', [config.storageTokenKeyName]: null, [config.storageRefreshTokenKeyName]: null})

        // ** Remove user, accessToken & refreshToken from localStorage
        localStorage.removeItem('userData')
        localStorage.removeItem(config.storageTokenKeyName)
        localStorage.removeItem(config.storageRefreshTokenKeyName)
    }
}

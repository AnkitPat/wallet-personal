// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'
import axios from "axios"
import jwt_decode from 'jwt-decode'
import { toast } from "react-toastify"
import { history } from "../../../utility/Utils"
import { saveUserDetailsAction, setLoadingAction, setRoleAction } from './actions'


const config = useJwt.jwtConfig


function fetchUserInformation() {
    return axios.get('/auth/userDetails')
}

// ** Handle User Login
export const handleLogin = data => {
    return dispatch => {
        dispatch(setLoadingAction(true))

        return axios.post(`${process.env.REACT_APP_API_URL}auth/login`, data).then(response => {
            dispatch({
                type: 'LOGIN',
                [config.storageTokenKeyName]: response.data.access_token
            })

            // localStorage.setItem('token', response.data.access_token)
            localStorage.setItem(config.storageTokenKeyName, response.data.access_token)
            history.push('/home')
            dispatch(setLoadingAction(false))
        }).catch(error => {
            console.log(error)
            dispatch(setLoadingAction(false))
            toast.error('Login failed!!')
        })
    }
}


// ** Handle User Register
export const handleRegister = data => {
    return dispatch => {
        dispatch(setLoadingAction(true))

        return axios.post(`${process.env.REACT_APP_API_URL}auth/register`, data).then(response => {
            history.push('/verification')
            dispatch(setLoadingAction(false))
        }).catch(error => {
            console.log(error)
            dispatch(setLoadingAction(false))
            toast.error(error.response.data.message)
        })
    }
}

// ** Handle Forgot Password
export const handleForgotPassword = data => {
    return dispatch => {
        return axios.post(`${process.env.REACT_APP_API_URL}auth/forgotPassword`, data).then(response => {
            history.push('/login')
            toast.success("Email sent to reset password!!")
        }).catch(error => {
            console.log(error)
            toast.error(error.response.data.message)
        })
    }
}


// ** Handle User Verfication
export const handleVerification = data => {
    return dispatch => {
        return axios.post(`${process.env.REACT_APP_API_URL}auth/verifyCode`, data).then(response => {


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
            const decoded = jwt_decode(localStorage.getItem('token'))
            dispatch(setRoleAction(decoded.role))
        } catch (e) {
            toast.error(e)
        }
    }
}


// ** Handle User Logout
export const handleLogout = () => {
    return dispatch => {
        dispatch({ type: 'LOGOUT', [config.storageTokenKeyName]: null, [config.storageRefreshTokenKeyName]: null })

        // ** Remove user, accessToken & refreshToken from localStorage
        localStorage.removeItem('userData')
        localStorage.removeItem(config.storageTokenKeyName)
        localStorage.removeItem('token')
        localStorage.removeItem(config.storageRefreshTokenKeyName)
    }
}

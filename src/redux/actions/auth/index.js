// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'
import axios from "axios"
import { toast } from "react-toastify"
import { history, IsJsonString } from "../../../utility/Utils"
import { saveUserDetailsAction, setLoadingAction, setRoleAction, setTwoFactorAction } from './actions'
import speakeasy from 'speakeasy'

const config = useJwt.jwtConfig

function fetchUserInformation() {
    return axios.get('/auth/userDetails')
}

function secretInformationToAPI(secret) {
    return axios.put('/users/2fa', {
        twoFactorAuthentication: true,
        twoFactorAuthenticationMetaData: secret
    })
}

// ** Handle User Login
export const handleLogin = data => {
    return dispatch => {
        dispatch(setLoadingAction(true))
        return axios.post(`auth/login`, data).then(async (response) => {
            dispatch({
                type: 'LOGIN',
                [config.storageTokenKeyName]: response.data.access_token
            })

            // localStorage.setItem('token', response.data.access_token)
            localStorage.setItem(config.storageTokenKeyName, response.data.access_token)
            const userResponse = await fetchUserInformation()
            if (userResponse && userResponse.data) {
                if (userResponse.data.twoFactorAuthentication) {
                    history.push('/authenticator')
                } else {
                    history.push('/home')
                }
            } else {
                history.push('/home')
            }
            dispatch(setLoadingAction(false))
        }).catch(error => {
            dispatch(setLoadingAction(false))
            toast.error('Login failed!!')
        })
    }
}


// ** Handle User Register
export const handleRegister = data => {
    return dispatch => {
        dispatch(setLoadingAction(true))
        return axios.post(`auth/register`, data).then(response => {
            history.push('/verification')
            dispatch(setLoadingAction(false))
        }).catch(error => {
            dispatch(setLoadingAction(false))
            toast.error(error.response.data.message)
        })
    }
}

// ** Handle Forgot Password
export const handleForgotPassword = data => {
    return dispatch => {
        return axios.post(`auth/forgotPassword`, data).then(response => {
            history.push('/login')
            toast.success("Email sent to reset password!!")
        }).catch(error => {
            toast.error(error.response.data.message)
        })
    }
}

// ** Handle User Verification
export const handleVerification = data => {
    return dispatch => {
        return axios.post(`auth/verifyCode`, data).then(response => {
            history.push('/login')
            toast.success('Account verified successfully!!')
        }).catch(error => {
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
            dispatch(setRoleAction(userResponse.data.role.title))
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
        dispatch(setTwoFactorAction(false))
        dispatch(saveUserDetailsAction({}))
    }
}

// ** Handle two factor verification
export const verifyTwoFactorAuth = (secret, token, fromAuth = false) => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingAction(true))
            if (IsJsonString(secret)) secret = JSON.parse(secret)
            const verified = await speakeasy.totp.verify({
                secret: secret.ascii,
                encoding: 'ascii',
                token
            })

            if (verified) {
                toast.success('Secret Code verified!!', {})
                // save secret to api
                await secretInformationToAPI(secret)
                dispatch(handleUserInformation())
                dispatch(setTwoFactorAction(true))
                if (fromAuth) history.push("/home")

            } else {
                toast.error('Code is wrong, try again')
            }
            dispatch(setLoadingAction(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoadingAction(false))
            toast.error('Something went wrong')
        }

    }
}

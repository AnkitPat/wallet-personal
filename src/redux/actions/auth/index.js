// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'
import axios from "axios"
import {toast} from "react-toastify"
import {history} from "../../../utility/Utils"

const config = useJwt.jwtConfig

// ** Handle User Login
export const handleLogin = data => {
    return dispatch => {
        return axios.post(`auth/login`, data).then(response => {
            dispatch({
                type: 'LOGIN',
                [config.storageTokenKeyName]: response.data.access_token
            })

            localStorage.setItem(config.storageTokenKeyName, JSON.stringify(response.data.access_token))
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
        return axios.post(`auth/register`, data).then(response => {
            history.push('/verification')
        }).catch(error => {
            console.log(error)
            //toast.error(error.response.data.message)
        })
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

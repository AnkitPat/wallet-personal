// ** UseJWT import to get config
import axios from 'axios'
import { toast } from "react-toastify"
import { history } from "../../../utility/Utils"
import { handleUserInformation } from '../auth'
import { setLoadingAction } from '../auth/actions'
import { saveCountriesAction, setLoadingAction as loadingAction } from '../myAccount/actions'
import { saveReferredUserAction } from './actions'

function updateAvatar(data) {
    const base64 = data
    return fetch(base64)
        .then(res => res.blob())
        .then(blob => {
            const fd = new FormData()
            const file = new File([blob], 'filename.jpeg')
            fd.append('avatar', file)

            return axios.post('users/upload/avatar', fd)
        })
}

function updateUserDetailsApi(data) {
    return axios.put('users', data)
}

function changePasswordAPI(data) {
    return axios.post('auth/changePassword', data)
  }


function fetchReferredUsersAPI() {
    return axios.get('users/referred')
}

function fetchCountiesAPI() {
    return axios.get('users/countries')
}

// ** Handle User Login
export const handleUserInformationUpdate = action => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingAction(true))
            const { isProfilePhotoUpdated } = action
            let { data } = action
            if (isProfilePhotoUpdated) {
                const response = await updateAvatar(data.profilePhoto)
                data = {
                    ...data,
                    avatar: response.data.avatarLocation,
                    avatarImageKey: response.data.avatarImageKey
                }
            }
            delete data.profilePhoto
            await updateUserDetailsApi(data)
            dispatch(handleUserInformation())
            toast.success('User information updated successfully')
            history.goBack()
            dispatch(setLoadingAction(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoadingAction(false))
            toast.error('Error in updating user Info')
        }
    }
}

// ** Handle User password change
export const handleChangePassword = data => {
    return async (dispatch) => {
        try {
            dispatch(setLoadingAction(true))
            await changePasswordAPI(data)
            toast.success('User Password updated successfully')
            history.goBack()
            dispatch(setLoadingAction(false))
        } catch (e) {
            console.log(e)
            dispatch(setLoadingAction(false))
            toast.error('Error in updating user password')
        }
    }
}

// Get referred users
export const fetchReferredUsers = () => {
    return (async (dispatch) => {
        try {
            dispatch(loadingAction(true))
            const response = await fetchReferredUsersAPI()
            if (response && response.data) {
                dispatch(saveReferredUserAction(response.data))
            }
            dispatch(loadingAction(false))
        } catch (e) {
            console.log(e)
            toast.error('Failed to fetch referred users')
            dispatch(loadingAction(false))
        }
    })
}

// Fetch countries
export const fetchCountries = () => {
    return (async (dispatch) => {
        try {
            const response = await fetchCountiesAPI()
            if (response && response.data) {
                dispatch(saveCountriesAction(response.data))
            }
        } catch (e) {
            console.log(e)
            toast.error('Failed to fetch  countries')
        }
    })
}

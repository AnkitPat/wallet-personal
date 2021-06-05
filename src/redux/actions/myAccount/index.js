// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'
import { toast } from "react-toastify"
import { axiosInstance } from '../../../utility/api'
import { history } from "../../../utility/Utils"
import { handleUserInformation } from '../auth'

const config = useJwt.jwtConfig


function updateAvatar(data) {
    const base64 = data
    return fetch(base64)
        .then(res => res.blob())
        .then(blob => {
            const fd = new FormData()
            const file = new File([blob], 'filename.jpeg')
            fd.append('avatar', file)

            return axiosInstance().post('users/upload/avatar', fd)
        })
}

function updateUserDetailsApi(data) {
    return axiosInstance().put('users', data)
}

function changePasswordAPI(data) {
    return axiosInstance().post('auth/changePassword', data)
  }

// ** Handle User Login
export const handleUserInformationUpdate = action => {
    return async (dispatch) => {
        try {
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
        } catch (e) {
            console.log(e)
            toast.error('Error in updating user Info')
        }
    }
}

// ** Handle User password change
export const handleChangePassword = data => {
    return async (dispatch) => {
        try {
            await changePasswordAPI(data)
            toast.success('User Password updated successfully')
            history.goBack()
        } catch (e) {
            console.log(e)
            toast.error('Error in updating user password')
        }
    }
}


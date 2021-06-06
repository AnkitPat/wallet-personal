export const SAVE_USER_DETAILS = 'wallet/auth/SAVE_USER_DETAILS'
export const SET_LOADING = 'wallet/auth/SET_LOADING'
export const SET_ROLE = 'wallet/auth/SET_ROLE'

export const saveUserDetailsAction = (userDetails) => {
    return {
        type: SAVE_USER_DETAILS,
        userDetails
    }
}

export const setLoadingAction = (flag) => {
    return {
        type: SET_LOADING,
        flag
    }
}

export const setRoleAction = role => {
    return {
        type: SET_ROLE,
        role
    }
}
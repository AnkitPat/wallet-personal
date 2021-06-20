export const SAVE_REFERRED_USERS = 'wallet/myaccount/SAVE_REFERRED_USERS'
export const SET_LOADING = 'wallet/myaccount/SET_LOADING'

export const saveReferredUserAction = (users) => {
    return {
        type: SAVE_REFERRED_USERS,
        users
    }
}

export const setLoadingAction = (flag) => {
    return {
        type: SET_LOADING,
        flag
    }
}
export const SAVE_USERS_LIST = 'wallet/users/SAVE_USERS_LIST'
export const SET_LOADING = 'wallet/users/SET_LOADING'

export const setLoadingAction = flag => {
    return {
        type: SET_LOADING,
        flag
    }
}

export const saveUsersListAction = users => {
    return {
        type: SAVE_USERS_LIST,
        users
    }
}
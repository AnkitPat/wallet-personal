export const SAVE_TOKEN_INFO = 'wallet/dashboard/SAVE_TOKEN_INFO'
export const SET_LOADING = 'wallet/dashboard/SET_LOADING'

export const setLoadingAction = flag => {
    return {
        type: SET_LOADING,
        flag
    }
}

export const saveTokenInfoAction = tokenInfo => {
    return {
        type: SAVE_TOKEN_INFO,
        tokenInfo
    }
}
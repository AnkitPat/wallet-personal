export const SET_LOADING = 'wallet/withdrawal/SET_LOADING'

export const setLoadingAction = flag => {
    return {
        type: SET_LOADING,
        flag
    }
}

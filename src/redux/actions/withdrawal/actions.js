export const SET_LOADING = 'wallet/withdrawal/SET_LOADING'
export const SET_PAGE_LOADING = 'wallet/withdrawal/SET_PAGE_LOADING'
export const SAVE_WITHDRAWAL_LIST = 'wallet/withdrawal/SAVE_WITHDRAWAL_LIST'
export const SAVE_ALL_WITHDRAWAL_LIST = 'wallet/withdrawal/SAVE_ALL_WITHDRAWAL_LIST'

export const setLoadingAction = flag => {
    return {
        type: SET_LOADING,
        flag
    }
}

export const setPageLoadingAction = flag => {
    return {
        type: SET_PAGE_LOADING,
        flag
    }
}

export const setWithdrawalHistoryAction = (withdrawals) => {
    return {
        type: SAVE_WITHDRAWAL_LIST,
        withdrawals
    }
}


export const setAllWithdrawalHistoryAction = (withdrawals) => {
    return {
        type: SAVE_ALL_WITHDRAWAL_LIST,
        withdrawals
    }
}
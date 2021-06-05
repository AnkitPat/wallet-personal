export const SET_LOADING = 'wallet/wallet/SET_LOADING'
export const FETCH_WALLET_HISTORY = 'wallet/wallet/FETCH_WALLET_HISTORY'
export const SAVE_WALLET_HISTORY = 'wallet/wallet/SAVE_WALLET_HISTORY'

export const setLoadingAction = flag => {
    return {
        type: SET_LOADING,
        flag
    }
}

export const fetchWalletHistoryAction = () => {
    return {
        type: FETCH_WALLET_HISTORY
    }
}

export const saveWalletHistoryAction = (history) => {
    return {
        type: SAVE_WALLET_HISTORY,
        history
    }
}
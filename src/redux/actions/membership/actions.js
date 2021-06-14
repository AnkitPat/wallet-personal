export const SET_LOADING = 'wallet/membership/SET_LOADING'
export const SAVE_PLANS = 'wallet/membership/SAVE_PLANSv'

export const setLoadingAction = flag => {
    return {
        type: SET_LOADING,
        flag
    }
}

export const savePlansActions = (plans) => {
    return {
        type: SAVE_PLANS,
        plans
    }
}
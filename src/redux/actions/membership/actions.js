export const SET_LOADING = 'wallet/membership/SET_LOADING'
export const SAVE_PLANS = 'wallet/membership/SAVE_PLANSv'
export const CREATE_SUBSCRIPTION_PAYMENT_REQUEST = 'wallet/membership/CREATE_SUBSCRIPTION_PAYMENT_REQUEST'

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

export const createSubscriptionPayment = (id) => {
    return {
        type: CREATE_SUBSCRIPTION_PAYMENT_REQUEST,
        id
    }
}

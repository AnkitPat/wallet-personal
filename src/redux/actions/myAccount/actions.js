export const SAVE_REFERRED_USERS = 'wallet/myaccount/SAVE_REFERRED_USERS'
export const SET_LOADING = 'wallet/myaccount/SET_LOADING'
export const SAVE_COUNTRIES = 'wallet/myaccount/SAVE_COUNTRIES'

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

export const saveCountriesAction = countries => {
    return {
        type: SAVE_COUNTRIES,
        countries
    }
}
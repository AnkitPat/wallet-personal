export const SAVE_BOUNTIES = 'wallet/bounty/SAVE_BOUNTIES'
export const SET_BUTTON_LOADING = 'wallet/bounty/SET_BUTTON_LOADING'
export const SET_LOADING = 'wallet/bounty/SET_LOADING'
export const FETCH_BOUNTY_DETAIL = 'wallet/bounty/FETCH_BOUNTY_DETAIL'
export const SAVE_BOUNTY_DETAIL = 'wallet/bounty/SAVE_BOUNTY_DETAIL'

export const saveBountiesAction = (bounties) => {
    return {
        type: SAVE_BOUNTIES,
        bounties
    }
}

export const setButtonLoadingAction = (flag) => {
    return {
        type: SET_BUTTON_LOADING,
        flag
    }
}

export const setLoadingAction = (flag) => {
    return {
        type: SET_LOADING,
        flag
    }
}

export const fetchBountyAction = (id) => {
    return {
        type: FETCH_BOUNTY_DETAIL,
        id
    }
}

export const saveBountyAction = (bounty) => {
    return {
        type: SAVE_BOUNTY_DETAIL,
        bounty
    }
}
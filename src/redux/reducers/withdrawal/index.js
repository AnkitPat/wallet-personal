import produce from 'immer'
import { SAVE_ALL_WITHDRAWAL_LIST, SAVE_WITHDRAWAL_LIST, SET_LOADING, SET_PAGE_LOADING } from '../../actions/withdrawal/actions'

// **  Initial State
const initialState = {
    loading: false,
    pageLoading: false,
    withdrawals: [],
    allWithdrawals: []
}

/* eslint-disable default-case, no-param-reassign */
const withdrawalReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {

            case SET_LOADING:
                draft.loading = action.flag
                break

            case SET_PAGE_LOADING:
                draft.pageLoading = action.flag
                break

            case SAVE_WITHDRAWAL_LIST:
                draft.withdrawals = action.withdrawals
                break

            case SAVE_ALL_WITHDRAWAL_LIST:
                draft.allWithdrawals = action.withdrawals
                break
        }
    })

export default withdrawalReducer

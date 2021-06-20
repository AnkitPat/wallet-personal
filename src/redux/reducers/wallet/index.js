import produce from 'immer'
import { SAVE_EARNINGS, SAVE_SPENTS_HISTORY, SAVE_WALLET_HISTORY, SET_LOADING } from '../../actions/wallet/actions'

// **  Initial State
const initialState = {
    history: [],
    loading: false,
    earnings: [],
    spentHistory: []
}

/* eslint-disable default-case, no-param-reassign */
const walletReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {

            case SAVE_WALLET_HISTORY:
                draft.history = action.history
                break

            case SET_LOADING:
                draft.loading = action.flag
                break

            case SAVE_EARNINGS:
                draft.earnings = action.earnings
                break

            case SAVE_SPENTS_HISTORY:
                draft.spentHistory = action.spents
                break
        }
    })

export default walletReducer

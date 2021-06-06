import produce from 'immer'
import { SAVE_TOKEN_INFO, SET_LOADING } from '../../actions/dashboard/actions'

// **  Initial State
const initialState = {
    tokenInfo: {},
    loading: false
}

/* eslint-disable default-case, no-param-reassign */
const dashboardReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {

            case SAVE_TOKEN_INFO:
                draft.tokenInfo = action.tokenInfo
                break

            case SET_LOADING:
                draft.loading = action.flag
                break


        }
    })

export default dashboardReducer

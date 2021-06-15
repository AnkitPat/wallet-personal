import produce from 'immer'
import { SAVE_PLANS, SET_LOADING } from '../../actions/membership/actions'

// **  Initial State
const initialState = {
    plans: [],
    loading: false
}

/* eslint-disable default-case, no-param-reassign */
const membershipReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {

            case SAVE_PLANS:
                draft.plans = action.plans
                break

            case SET_LOADING:
                draft.loading = action.flag
                break


        }
    })

export default membershipReducer

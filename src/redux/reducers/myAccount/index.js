import produce from 'immer'
import { SAVE_COUNTRIES, SAVE_REFERRED_USERS, SET_LOADING } from '../../actions/myAccount/actions'

// **  Initial State
const initialState = {
    referredUsers: [],
    loading: false,
    countries: []
}

/* eslint-disable default-case, no-param-reassign */
const myAccountReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {

            case SAVE_REFERRED_USERS:
                draft.referredUsers = action.users
                break

            case SET_LOADING:
                draft.loading = action.flag
                break

            case SAVE_COUNTRIES:
                draft.countries = action.countries
                break

        }
    })

export default myAccountReducer

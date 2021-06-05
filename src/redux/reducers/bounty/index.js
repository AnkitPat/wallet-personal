import produce from 'immer'
import { SAVE_BOUNTIES, SAVE_BOUNTY_DETAIL, SET_BUTTON_LOADING, SET_LOADING } from '../../actions/bounty/actions'

// **  Initial State
const initialState = {
    bounties: [],
    loading: false,
    buttonLoading: false,
    bounty: {}
}

/* eslint-disable default-case, no-param-reassign */
const bountyReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {

            case SAVE_BOUNTIES:
                draft.bounties = action.bounties
                break

            case SET_LOADING:
                draft.loading = action.flag
                break

            case SET_BUTTON_LOADING:
                draft.buttonLoading = action.flag
                break


            case SAVE_BOUNTY_DETAIL:
                draft.bounty = action.bounty
                break

        }
    })

export default bountyReducer

import produce from 'immer'
import { SET_LOADING } from '../../actions/withdrawal/actions'

// **  Initial State
const initialState = {
    loading: false
}

/* eslint-disable default-case, no-param-reassign */
const withdrawalReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {

            case SET_LOADING:
                draft.loading = action.flag
                break


        }
    })

export default withdrawalReducer

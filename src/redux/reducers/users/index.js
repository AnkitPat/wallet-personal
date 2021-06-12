import produce from 'immer'
import { SAVE_USERS_LIST, SET_LOADING } from '../../actions/users/actions'

// **  Initial State
const initialState = {
    users: [],
    loading: false,
    userCount: 0
}

/* eslint-disable default-case, no-param-reassign */
const usersReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {

            case SAVE_USERS_LIST:
                draft.users = action.users.users
                draft.userCount = action.users.usersCount
                break

            case SET_LOADING:
                draft.loading = action.flag
                break


        }
    })

export default usersReducer

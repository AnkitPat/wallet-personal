import produce from 'immer'
import { SAVE_USER_DETAILS } from "../../actions/auth/actions"

// **  Initial State
const initialState = {
  userDetails: {},
  accessToken: ''
}

/* eslint-disable default-case, no-param-reassign */
const authReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case 'LOGIN':
        draft.accessToken = action.accessToken
        break

      case 'LOGOUT':
        draft.accessToken = ''
        draft.userDetails = {}
        break

      case SAVE_USER_DETAILS:
        draft.userDetails = action.userDetails
        break
    }
  })

export default authReducer

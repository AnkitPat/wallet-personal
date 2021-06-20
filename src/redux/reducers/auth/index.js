import produce from 'immer'
import { SAVE_USER_DETAILS, SET_LOADING, SET_ROLE, SET_TWO_FACTOR } from "../../actions/auth/actions"

// **  Initial State
const initialState = {
  userDetails: {},
  accessToken: '',
  loading: false,
  userRole: '',
  twoFactorSuccess: false
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

      case SET_LOADING:
        draft.loading = action.flag
        break

      case SET_ROLE:
        draft.userRole = action.role
        break

      case SET_TWO_FACTOR:
        draft.twoFactorSuccess = action.flag
        break
    }
  })

export default authReducer

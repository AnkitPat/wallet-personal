// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import bounty from './bounty'
import wallet from './wallet'
import users from './users'
import dashboard from './dashboard'
import membership from './membership'
import withdrawal from './withdrawal'
import myaccount from './myAccount'
import projects from './projects'
import { connectRouter } from 'connected-react-router'
import { history } from '../../utility/Utils'

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth,
  navbar,
  layout,
  bounty,
  wallet,
  dashboard,
  users,
  membership,
  withdrawal,
  projects,
  myaccount
})

export default rootReducer

// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from './auth'
import navbar from './navbar'
import layout from './layout'
import { connectRouter } from 'connected-react-router'
import { history } from '../../utility/Utils'

const rootReducer = combineReducers({
  router: connectRouter(history),
  auth,
  navbar,
  layout
})

export default rootReducer

import {legacy_createStore as createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { authSignUpReducer, authSignInReducer, authSignOutReducer, getAuthUserReducer } from "./reducers/authReducers"

const reducer = combineReducers({
  userSignUp: authSignUpReducer,
  userLogIn: authSignInReducer,
  userSignOut: authSignOutReducer,
  userInfo: getAuthUserReducer
})

const userFromStorage= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
const initialState= {
  userLogIn: { user: userFromStorage }
}
const middleware= [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
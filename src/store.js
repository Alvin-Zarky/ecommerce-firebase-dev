import {legacy_createStore as createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { authSignUpReducer, authSignInReducer, getAuthUserReducer } from "./reducers/authReducers"
import { adminAddProductReducer, adminEditProductReducer, adminEditUser, adminGetProductDetail, adminGetProductReducer, adminGetUserDetails, adminUserReducers } from "./reducers/adminReducers"
import { getProductDetailReducer, getProductListReducer, getProductSlideReducer } from "./reducers/productReducers"

const reducers = combineReducers({
  userSignUp: authSignUpReducer,
  userLogIn: authSignInReducer,
  userInfo: getAuthUserReducer,
  adminUsers: adminUserReducers,
  adminUserDetail: adminGetUserDetails,
  adminEditUser: adminEditUser,
  adminGetProduct: adminGetProductReducer,
  adminGetProductDetail: adminGetProductDetail,
  adminAddProduct: adminAddProductReducer,
  adminEditProduct: adminEditProductReducer,
  products: getProductListReducer,
  productSlides: getProductSlideReducer,
  productDetail: getProductDetailReducer
})

const userFromStorage= localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
const initialState= {
  userLogIn: { user: userFromStorage }
}
const middleware= [thunk]

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
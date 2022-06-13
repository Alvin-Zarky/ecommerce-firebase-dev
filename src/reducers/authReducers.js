import {
  AUTH_SIGN_UP_REQUEST,
  AUTH_SIGN_UP_SUCCESS,
  AUTH_SIGN_UP_FAIL,
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_IN_FAIL,
  AUTH_SIGN_OUT_REQUEST,
  AUTH_SIGN_OUT_SUCCESS,
  AUTH_SIGN_OUT_FAIL,
  GET_AUTH_USER_REQUEST,
  GET_AUTH_USER_SUCCESS,
  GET_AUTH_USER_FAIL,
  
} from '../constants/authConstants'

const initialState={
  user:null,
  isLoading:false,
  isError:false,
  isSuccess:false,
  message:''
}

export const authSignUpReducer = (state={ user:null, isLoading:false }, action) =>{
  switch(action.type){
    case AUTH_SIGN_UP_REQUEST:
      return { isLoading:true, isError:false }
    case AUTH_SIGN_UP_SUCCESS:
      return { isLoading:false, isError:false, user: action.payload }
    case AUTH_SIGN_UP_FAIL:
      return { isLoading:false, isError: true, message: action.payload }
    default:
      return state
  }
}

export const authSignInReducer= (state={ user:null, isLoading:false }, action) =>{
  switch(action.type){
    case AUTH_SIGN_IN_REQUEST:
      return { isLoading:true }
    case AUTH_SIGN_IN_SUCCESS:
      return { isLoading:false, user: action.payload }
    case AUTH_SIGN_IN_FAIL:
      return { isLoading:false, isError:true, message: action.payload }
    default:
      return state
  }
}

export const authSignOutReducer = (state= {user: null}, action) =>{
  switch(action.type){
    case AUTH_SIGN_OUT_REQUEST:
      return { isLoading:true }
    case AUTH_SIGN_OUT_SUCCESS:
      return { isLoading:false, user: null, isSuccess:true }
    case AUTH_SIGN_OUT_FAIL:
      return { isLoading:false, isError:true, message: action.payload }
    default:
      return state
  }
}

export const getAuthUserReducer = (state= {user: null}, action) =>{
  switch(action.type){
    case GET_AUTH_USER_REQUEST:
      return { isLoading:true }
    case GET_AUTH_USER_SUCCESS:
      return { isLoading:false, user: action.payload, isSuccess:true }
    case GET_AUTH_USER_FAIL:
      return { isLoading:false, isError:true, message: action.payload }
    default:
      return state
  }
}
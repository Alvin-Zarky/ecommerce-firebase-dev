import {
  AUTH_SIGN_UP_REQUEST,
  AUTH_SIGN_UP_SUCCESS,
  AUTH_SIGN_UP_FAIL,
  AUTH_SIGN_IN_REQUEST,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_IN_FAIL,
  AUTH_SIGN_OUT_FAIL,
  AUTH_SIGN_OUT_SUCCESS,
  GET_AUTH_USER_FAIL,
  GET_AUTH_USER_REQUEST,
  GET_AUTH_USER_SUCCESS
} from '../constants/authConstants.js'
import {firestore, auth} from "../config/firebase"

export const authSignUpAction = (email, password, name) => async (dispatch, getState) =>{
  try{
    dispatch({ type: AUTH_SIGN_UP_REQUEST })

    const res= await auth.createUserWithEmailAndPassword(email, password)
    if(res){
      await res.user.updateProfile({displayName: name})
      dispatch({ type: AUTH_SIGN_UP_SUCCESS, payload: res.user })
    }

    dispatch({ type: AUTH_SIGN_IN_SUCCESS, payload: res.user })
    const data={
      id: res.user.uid,
      displayName: name,
      email,
      isAdmin:false,
      role:"user",
      createdAt: Date.now()
    }
    if(data){
      localStorage.setItem('user', JSON.stringify(data)) 
    }
    return await firestore.collection('users').doc(res.user.uid).set(data)
    
  }catch(err){
    dispatch({type:AUTH_SIGN_UP_FAIL, payload:err.message  })
  }
}

export const authSignInAction = (email, password) => async(dispatch, getState) => {
  try{
    dispatch({type: AUTH_SIGN_IN_REQUEST })
    const res= await auth.signInWithEmailAndPassword(email, password)
    if(res){
      const data={
        uid: res.user.uid,
        displayName: res.user.displayName,
        email,
        createdAt: Date.now()
      }
      dispatch({ type: AUTH_SIGN_IN_SUCCESS, payload: res.user })
      localStorage.setItem('user', JSON.stringify(data))
    }
  }catch(err){
    dispatch({ type: AUTH_SIGN_IN_FAIL, payload: err.message })
  }
}

export const authSignOutAction = () => async(dispatch, getState) =>{
  try{
    return await auth.signOut().then(() =>{
      dispatch({type: AUTH_SIGN_OUT_SUCCESS })
      dispatch({ type: AUTH_SIGN_IN_SUCCESS, payload: null })
      dispatch({ type: AUTH_SIGN_UP_SUCCESS, payload:null })
      dispatch({ type: GET_AUTH_USER_SUCCESS, payload:null })
    }) 
  }catch(err){
    dispatch({ type: AUTH_SIGN_OUT_FAIL, payload: err.message })
  }
}

export const getAuthUserAction= (id) => async(dispatch, getState) =>{
  try{
    dispatch({ type: GET_AUTH_USER_REQUEST })
    
    return await firestore.collection('users').doc(id).get().then((doc) =>{
      dispatch({ type: GET_AUTH_USER_SUCCESS, payload: doc.data() })
    })
  }catch(err){
    dispatch({ type: GET_AUTH_USER_FAIL, payload: err.message })
  }
}
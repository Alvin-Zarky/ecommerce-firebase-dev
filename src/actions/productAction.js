import {firestore} from "../config/firebase"
import { GET_PRODUCT_DETAIL_FAIL, GET_PRODUCT_DETAIL_REQUEST, GET_PRODUCT_DETAIL_SUCCESS, GET_PRODUCT_LIST_FAIL, GET_PRODUCT_LIST_REQUEST, GET_PRODUCT_LIST_SUCCESS, GET_PRODUCT_SLIDE_FAIL, GET_PRODUCT_SLIDE_REQUEST, GET_PRODUCT_SLIDE_SUCCESS } from "../constants/productConstants"

export const getProductListAction = () => async(dispatch, getState) =>{
  try{
    dispatch({ type: GET_PRODUCT_LIST_REQUEST })

    return firestore.collection('products').orderBy("createdAt", "desc").onSnapshot(snapshot =>{
      if(!snapshot.empty){
        const data=[]
        snapshot.docs.forEach(value =>{
          data.push({
            ...value.data(),
            id: value.id
          })
        })
        dispatch({ type: GET_PRODUCT_LIST_SUCCESS, payload: data })
      }else{
        dispatch({ type: GET_PRODUCT_LIST_FAIL, payload: `No product data found...!` })
      }
    })
  }catch(err){
    dispatch({ type: GET_PRODUCT_LIST_FAIL, payload: err.message })
  }
}

export const getProductSlideAction = () => async(dispatch, getState) =>{
  try{
    dispatch({ type: GET_PRODUCT_SLIDE_REQUEST })
    
    return firestore.collection('products').limit(3).onSnapshot(snapshot =>{
      if(!snapshot.empty){
        const data=[]
        snapshot.docs.forEach(value =>{
          data.push({
            ...value.data(),
            id: value.id
          })
        })
        dispatch({ type: GET_PRODUCT_SLIDE_SUCCESS, payload: data })
      }
    })
  }catch(err){
    dispatch({ type: GET_PRODUCT_SLIDE_FAIL, payload: err.message })
  }
}

export const getProductDetailAction = (id) => async(dispatch, getState) =>{
  try{
    dispatch({ type: GET_PRODUCT_DETAIL_REQUEST })
    
    firestore.collection('products').doc(id).onSnapshot(snapshot =>{
      if(snapshot.exists){
        dispatch({ type: GET_PRODUCT_DETAIL_SUCCESS, payload: snapshot.data() })
      }else{
        dispatch({ type: GET_PRODUCT_DETAIL_FAIL, payload: `No product detail found...!` })
      }
    })
  }catch(err){
    dispatch({ type: GET_PRODUCT_DETAIL_FAIL, payload: err.message })
  }
}
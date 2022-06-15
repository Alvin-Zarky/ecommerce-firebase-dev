import { GET_PRODUCT_DETAIL_FAIL, GET_PRODUCT_DETAIL_REQUEST, GET_PRODUCT_DETAIL_SUCCESS, GET_PRODUCT_LIST_FAIL, GET_PRODUCT_LIST_REQUEST, GET_PRODUCT_LIST_SUCCESS, GET_PRODUCT_SLIDE_FAIL, GET_PRODUCT_SLIDE_REQUEST, GET_PRODUCT_SLIDE_SUCCESS } from "../constants/productConstants";

export const getProductListReducer= (state= { products:[], isLoading:false }, action) =>{
  switch(action.type){
    case GET_PRODUCT_LIST_REQUEST:
      return { isLoading:true }
    case GET_PRODUCT_LIST_SUCCESS:
      return { isLoading:false, products: action.payload }
    case GET_PRODUCT_LIST_FAIL:
      return { isLoading:false, message: action.payload, isError:true }
    default:
      return state
  }
}

export const getProductSlideReducer= (state= { products:[], isLoading:false }, action) =>{
  switch(action.type){
    case GET_PRODUCT_SLIDE_REQUEST:
      return { isLoading:true }
    case GET_PRODUCT_SLIDE_SUCCESS:
      return { isLoading:false, products: action.payload }
    case GET_PRODUCT_SLIDE_FAIL:
      return { isLoading:false, message: action.payload, isError:true }
    default:
      return state
  }
}

export const getProductDetailReducer= (state= { product:{}, isLoading:false }, action) =>{
  switch(action.type){
    case GET_PRODUCT_DETAIL_REQUEST:
      return { isLoading:true }
    case GET_PRODUCT_DETAIL_SUCCESS:
      return { isLoading:false, product: action.payload }
    case GET_PRODUCT_DETAIL_FAIL:
      return { isLoading:false, message: action.payload, isError:true }
    default:
      return state
  }
}


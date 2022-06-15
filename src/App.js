import React, {useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import * as Routes from "./router"
import Overview from './view/overview';
import NotFound from "./view/not-found"
import ShoppingCart from './view/shopping-carts';
import SignIn from './view/sign-in';
import ProductDetail from './view/product-detail';
import SignUp from './view/sign-up';
import { ToastContainer } from 'react-toastify';
import {useSelector, useDispatch} from "react-redux"
import {getAuthUserAction} from "./actions/authActions"
import {Redirect} from "react-router-dom"
import AdminUser from './view/admin-user';
import EditUserInfo from './view/edit-user';
import AdminProduct from './view/admin-product';
import AddProduct from './view/add-product';
import EditProduct from './view/edit-product';
import AdminOrder from './view/admin-order';
import MyProfile from './view/profile';

function App() {
  const {user} = useSelector(state => state.userLogIn)
  const {user: userInfo} = useSelector(state => state.userInfo)
  const dispatch= useDispatch()

  useEffect(() =>{
    if(user && user.uid){
      dispatch(getAuthUserAction(user.uid))
    }
  }, [dispatch, user])
  
  return (
    <>
      <Router>
        <Switch>
          <Route exact path={Routes.INDEX}>
            <Overview />
          </Route>
          <Route path={Routes.CART}>
            <ShoppingCart />
          </Route>
          <Route path={Routes.SIGN_IN}>
            {!user && <SignIn />}
            {user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={`${Routes.PRODUCT}/:id`}>
            <ProductDetail />
          </Route>
          <Route path={Routes.SIGN_UP}>
            {!user && <SignUp />}
            {user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={Routes.PROFILE}>
            {user && <MyProfile />}
            {!user && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route exact path={Routes.ADMIN_USER}>
            {userInfo && userInfo.isAdmin && userInfo.role==="admin" && <AdminUser />}
            {!user && !userInfo && <Redirect to={Routes.INDEX} />}
            {userInfo && !userInfo.isAdmin && userInfo.role !== "admin" && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={`${Routes.ADMIN_EDIT_USER}/:id`}>
            {userInfo && userInfo.isAdmin && userInfo.role==="admin" && <EditUserInfo />}
            {!user && !userInfo && <Redirect to={Routes.INDEX} />}
            {userInfo && !userInfo.isAdmin && userInfo.role !== "admin" && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route exact path={Routes.ADMIN_PRODUCT}>
            {userInfo && userInfo.isAdmin && userInfo.role==="admin" && <AdminProduct />}
            {!user && !userInfo && <Redirect to={Routes.INDEX} />}
            {userInfo && !userInfo.isAdmin && userInfo.role !== "admin" && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route exact path={`${Routes.ADMIN_PRODUCT}/add`}>
            {userInfo && userInfo.isAdmin && userInfo.role==="admin" && <AddProduct />}
            {!user && !userInfo && <Redirect to={Routes.INDEX} />}
            {userInfo && !userInfo.isAdmin && userInfo.role !== "admin" && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route exact path={`${Routes.ADMIN_PRODUCT}/edit/:id`}>
            {userInfo && userInfo.isAdmin && userInfo.role==="admin" && <EditProduct />}
            {!user && !userInfo && <Redirect to={Routes.INDEX} />}
            {userInfo && !userInfo.isAdmin && userInfo.role !== "admin" && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route exact path={Routes.ADMIN_ORDER}>
            {userInfo && userInfo.isAdmin && userInfo.role==="admin" && <AdminOrder />}
            {!user && !userInfo && <Redirect to={Routes.INDEX} />}
            {userInfo && !userInfo.isAdmin && userInfo.role !== "admin" && <Redirect to={Routes.INDEX} />}
          </Route>
          <Route path={Routes.NOT_FOUND}>
            <NotFound />
          </Route>
        </Switch>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

import React, {useState} from 'react';
import NavBar from "../../components/Navbar"
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {authSignInAction} from "../../actions/authActions"
import * as Routes from "../../router";
import './sign-in.scss'

export default function SignIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword]= useState('')
  const {message, isError, isLoading} = useSelector(state => state.userLogIn)
  const dispatch= useDispatch()

  const handleSignIn= (e) =>{
    e.preventDefault()

    dispatch(authSignInAction(email, password))
  }

  return (
    <>
      <NavBar />
      <div className="maximum-width-page">
        <div className="sign-in">
          <div className="title-form">
            <span>Sign in</span>
          </div>
          <form onSubmit={handleSignIn}>
            <div className="input-field">
              <div>
                <label>Email Address</label>
              </div>
              <div>
                <input type="email" value={email} onChange={(e) => {setEmail(e.target.value)}} required placeholder='Please input the email' />
              </div>
            </div>
            <div className="input-field">
              <div>
                <label>Password</label>
              </div>
              <div>
                <input type="password" value={password} onChange={(e) => {setPassword(e.target.value)}} required placeholder='Please input the password' />
              </div>
            </div>
            {isLoading && <button>Signing in...</button>}
            {!isLoading && <button>Sign in</button>}
            <div className="link-page">
              <span>New Customer? <Link to={Routes.SIGN_UP}>Sign Up</Link></span>
            </div>
            {isError && (
              <div className="box-err-message">
                <span>{message}</span>
              </div>
            )}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

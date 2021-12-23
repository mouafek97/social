import { useContext, useRef } from "react";
import "./login.css";
import {logincall} from "../../apiCalls"
import {AuthContext} from "../../context/AuthContext"
import {CircularProgress  } from "@material-ui/core"
import { Link } from "react-router-dom";




export default function Login() {
  const email = useRef() ; 
  const password = useRef() ; 
  const {user ,error , isFetching , dispatch}= useContext(AuthContext)
  const handleClick=(e)=>{
    e.preventDefault() ; 
    logincall({email: email.current.value ,password :password.current.value },dispatch )

  }
  console.log(user)
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">mouafek social</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight" onSubmit={handleClick} >
          <form className="loginBox">
            <input
             placeholder="Email"
              type="email" 
              className="loginInput"
               ref={email} required 
                />
            <input 
            placeholder="Password"
            type="password" 
            className="loginInput"
             ref={password}  required
             minLength="6"
              />
            <button className="loginButton" type="submit" disabled={isFetching}>{isFetching? <CircularProgress color="white" size="40px"/> : "Log In"}</button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to ="/register"className="loginRegisterButton">
            {isFetching? (
              <CircularProgress color="white" size="40px"/> )
              :("create a new accountr") }

            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

import "./register.css";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import {useHistory} from "react-router"



export default function Register() {
  const username = useRef() ;
   const email = useRef() ; 
  const password = useRef() ; 
  const passwordAgain = useRef() ;
  const history =useHistory() ;
  const {user ,error , isFetching , dispatch}= useContext(AuthContext)
 
  const handleClick=async(e)=>{
    e.preventDefault() ; 
    if (passwordAgain.current.value!==password.current.value) 
    { passwordAgain.current.setCustomValidity("password don t match ")} else {
      const user = {
        username : username.current.value ,
        email : email.current.value , 
        password : password.current.value 
      }
      try {
        await axios.post('/auth/register' , user) 
        history.push("/Login")
      } catch (err) {
        console.log(err)
        
      }

    }
  }

  return (
    
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">mouafeksocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" ref={username} className="loginInput"required />
            <input placeholder="Email"ref={email} className="loginInput" type="email"required />
            <input placeholder="Password" type="password" required ref={password} className="loginInput" />
            <input placeholder="Password Again" type="password" required ref={passwordAgain} className="loginInput" />
            <button className="loginButton" type="submit">Sign Up</button>
            <Link to="/login" className="loginRegisterButton">log in </Link>
           
            
          </form>
        </div>
      </div>
    </div>
  );
}

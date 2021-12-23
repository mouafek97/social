import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import { AuthContext } from "./context/AuthContext";
import {
  Redirect , 
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useContext } from "react";

function App() {
  const {user} = useContext(AuthContext)
  return (
    <Router>
      <Switch>
      <Route exact path="/">
         {user ? < Home/> :  <Register/>} 
         </Route>
      <Route exact path="/register">
         {user ? <Redirect to="/" />: <Register/>} 
         </Route>
      <Route exact path="/login">
         {user? <Redirect to="/" /> : <Login/>}
         </Route>
      <Route exact path="/profile/:username">
         < Profile />
          </Route>
      </Switch>
    </Router>
  )
}

export default App;

import React, {useEffect, createContext, useReducer, useContext}from "react";
import Nav from "./components/static/Nav"
import Home from "./components/Home"
import Profile from "./components/Profile"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import CreatePost from "./components/CreatePost"
import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom"
import {reducer, initialState} from "./reducers/userReducers"

export const UserContext = createContext()

const Routing = ()=> {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER", payload:user})
    } else {
      history.push("/login")
    }
  }, [])
  return (
    <Switch>    
      <Route exact path="/">
        <Home/>
      </Route>
      <Route exact path="/createpost">
        <CreatePost/>
      </Route>
      <Route path="/profile">
        <Profile/>
      </Route>
      <Route path="/signup">
        <SignUp/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
    </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Nav/>
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App

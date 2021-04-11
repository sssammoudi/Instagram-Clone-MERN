import React, {useEffect, createContext, useReducer, useContext}from "react";
import Nav from "./components/static/Nav"
import Nav2 from "./components/static/Nav2"
import Home from "./components/Home"
import Profile from "./components/Profile"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import CreatePost from "./components/CreatePost"
import OnePost from "./components/static/OnePost"
import UserProfile from "./components/static/UserProfile"
import FollowingsPost from "./components/FollowingsPost"
import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom"
import {reducer, initialState} from "./reducers/userReducers"

export const UserContext = createContext()

const Routing = ()=> {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
    if(user){
      dispatch({type:"USER", payload:user})
    } else {
      history.push("/login")
    }
  }, [])
  useEffect(() => {
    if(user) {
      fetch("/userProfile", {
        method: "GET",
        headers:{
          "Authorization":"Bearer " + localStorage.getItem("jwt")
        },
      })
      .then(res => res.json())
      .then(result=>{
        localStorage.setItem("user", JSON.stringify(result))
      })
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
      <Route exact path="/profile">
        <Profile/>
      </Route>
      <Route path="/profile/:id" component={UserProfile}/>
      <Route path="/signup">
        <SignUp/>
      </Route>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/followingspost">
        <FollowingsPost />
      </Route>
      <Route path="/post/:id" component={OnePost}>
      </Route>
      <Route path="/chat">
        
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
        <Nav2/>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App

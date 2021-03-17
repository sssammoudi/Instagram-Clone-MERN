import React from "react";
import Nav from "./components/static/Nav"
import Home from "./components/Home"
import Profile from "./components/Profile"
import SignUp from "./components/SignUp"
import Login from "./components/Login"
import CreatePost from "./components/CreatePost"
import {BrowserRouter, Route} from "react-router-dom"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav/>
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
      </BrowserRouter>
    </div>
  )
}

export default App

import React, {useContext, useRef, useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import logout from "../images/logout.png"
import logo from "../images/logo.png"
import icon from "../images/profile-pic.png"
import M from 'materialize-css'

function Nav() {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  
  const renderList = ()=>{
    if(state) {
      return [
        <li key="1">
          <img src={logout} alt="Logout" className="Nav-Tab" width="50px" height="48px" onClick={()=>{
            localStorage.clear()
            dispatch({type:"CLEAR"})
            history.push('/login')
          }}/>
        </li>,
      ]
    } else {
      return [
        <li key="1"><Link to="/login">Login</Link></li>,
        <li key="2"><Link to="/signup">Sign up</Link></li>
      ]
    }
  }
  
  return (
    <nav className="nav-up">
      <div className="nav-wrapper grey darken-1">
        <Link to={state ? "/" : "/login"} className="brand-logo left"><img src={logo} alt="Home" className="Nav-Tab" width="50px" height="50px"/></Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
      <br />
    </nav>
  )
}

export default Nav

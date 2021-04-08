import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import profile from "../images/profile-pic.png"
import create from "../images/create.png"
import logout from "../images/logout.png"
import followTab from "../images/followTab.png"
import logo from "../images/logo.png"

function Nav() {
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  const renderList = ()=>{
    if(state) {
      return [
        <li key="1"><Link to="/followingspost"><img src={followTab} alt="Following-Post" className="Nav-Tab" width="50px" height="50px"/></Link></li>,
        <li key="2"><Link to="/createpost"><img src={create} alt="Create-Post" className="Nav-Tab" width="50px" height="50px"/></Link></li>,
        <li key="3"><Link to="/profile"><img src={profile} alt="Profile" className="Nav-Tab" width="50px" height="50px"/></Link></li>,
        <li key="4">
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
    <nav>
      <div className="nav-wrapper grey darken-1">
        <Link to={state ? "/" : "/login"} className="brand-logo left"><img src={logo} alt="Home" className="Nav-Tab" width="50px" height="50px"/></Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  )
}

export default Nav

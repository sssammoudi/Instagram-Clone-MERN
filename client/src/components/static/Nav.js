import React, {useContext} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../../App'

function Nav() {
  const history = useHistory()
  const {state,dispatch} = useContext(UserContext)
  const renderList = ()=>{
    if(state) {
      return [
        <li><Link to="/createpost">Create Post</Link></li>,
        <li><Link to="/profile">Profile</Link></li>,
        <li>
          <button className="btn #c62828 red darken-3"
            onClick={()=>{
              localStorage.clear()
              dispatch({type:"CLEAR"})
              history.push('/login')
            }}
            >
            Logout
          </button>
        </li>
      ]
    } else {
      return [
        <li><Link to="/login">Login</Link></li>,
        <li><Link to="/signup">Sign up</Link></li>
      ]
    }
  }
  return (
    <nav>
      <div className="nav-wrapper grey darken-1">
        <Link to={state ? "/" : "/signin"} className="brand-logo left">IG-Clone</Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  )
}

export default Nav

import React from 'react'
import {Link} from 'react-router-dom'

function Nav() {
  return (
    <nav>
      <div className="nav-wrapper grey darken-1">
        <Link to="/" className="brand-logo left">IG-Clone</Link>
        <ul id="nav-mobile" className="right">
          <li><Link to="/createpost">Create Post</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign up</Link></li>
          <li><Link to="/profile">Profile</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav

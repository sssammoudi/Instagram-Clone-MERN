import React from 'react'
import {Link} from 'react-router-dom'

function Nav() {
  return (
    <nav>
      <div className="nav grey darken-1">
        <Link to="/profile" className="right">Profile</Link>
      </div>
    </nav>
  )
}

export default Nav

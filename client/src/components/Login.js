import React from 'react'
import {Link} from "react-router-dom"

const Login = () => {
  return (
    <div className="mycard">
      <div className="card auth-card input-field blue-grey darken-3">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="email"
          />
        <input
          type="password"
          placeholder="password"
        />
        <button className="btn blue darken-1">Login</button>
        <h5><Link to="/signup">You don't have an account?</Link></h5>
      </div>
    </div>
  )
}

export default Login

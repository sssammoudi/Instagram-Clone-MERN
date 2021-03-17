import React, {useState} from 'react'
import {Link} from "react-router-dom"

const SignUp = () => {
  const [name, setName] = useState("");
  return (
    <div className="mycard">
      <div className="card auth-card input-field blue-grey darken-4">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="name"
        />
        <input
          type="text"
          placeholder="email"
        />
        <input
          type="password"
          placeholder="password"
        />
        <button className="btn #64b5f6">
          Sign Up
        </button>
        <h5><Link to="/login">Already have an account?</Link></h5>
      </div>
    </div>
  )
}

export default SignUp

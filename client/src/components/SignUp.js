import React, {useState} from 'react'
import {Link} from "react-router-dom"
import M from "materialize-css"

const SignUp = () => {
  const [name, setName] = useState("");
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");

  function postSignUp(){
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({
        "name": name,
        "password": pwd,
        "email": email
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        M.toast({html: data.error, classes: "red darken-1"})
      } else {
        M.toast({html: data.success, classes: "green accent-3"})
      }
    })
  }

  return (
    <div className="mycard">
      <div className="card auth-card input-field blue-grey darken-4">
        <h2>Sign Up</h2>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={pwd}
          onChange={(e)=>setPwd(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn #64b5f6 blue darken-1">
            <span>Upload pic</span>
            <input 
              type="file"
              // onChange={(e)=>setImage(e.target.files[0])} 
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button className="btn blue darken-1 waves-light waves-effect" onClick={(e) => (postSignUp())}>
          Sign Up
        </button>
        <h5><Link to="/login">Already have an account?</Link></h5>
      </div>
    </div>
  )
}

export default SignUp

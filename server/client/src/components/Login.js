import React, {useState, useContext} from 'react'
import {UserContext} from '../App'
import {Link, useHistory} from "react-router-dom"
import M from "materialize-css"

const Login = () => {
  const {state,dispatch} = useContext(UserContext)
  const history = useHistory()
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const [click, setClick] = useState(false);

  function postLogin(e){
    setClick(true)
    e.preventDefault()
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    console.log(regex.test(email))
    if(!regex.test(email)){
      M.toast({html: "invalid email",classes:"red darken-3"})
      setClick(false)
      return
    }
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({
        password,
        email,
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        M.toast({html: data.error, classes: "red darken-1"})
        setClick(false)
      } else {
        localStorage.setItem("jwt", data.token)
        localStorage.setItem("user", JSON.stringify(data.user))
        dispatch({type:"USER", payload:data.user})
        M.toast({html: data.success, classes: "green accent-3"})
        history.push("/")
      }
    })
  }

  return (
    <div className="mycard">
      <div className="card auth-card input-field blue-grey darken-3">
        <h2>Login</h2>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e)=>setpassword(e.target.value)}
        />
        <button className="btn blue darken-1" onClick={(e) => (postLogin(e))} disabled={click}>Login</button>
        <h5><Link to="/signup">You don't have an account?</Link></h5>
      </div>
    </div>
  )
}

export default Login

import React, {useState, useEffect} from 'react'
import {Link, useHistory} from "react-router-dom"
import M from "materialize-css"

const SignUp = () => {
  const history = useHistory()
  const [name, setName] = useState("");
  const [password, setpassword] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setpicture] = useState("");
  const [url, setUrl] = useState(null);
  const [click, setClick] = useState(false);

  useEffect(() => {
    postSignUp()
  }, [url]);

  function uploadPic() {
    const data = new FormData();
    data.append("file", picture)
    data.append("upload_preset", "instaClone")
    data.append("cloud_name", "dcyfsjd")
    fetch("https://api.cloudinary.com/v1_1/dcyfsjd/image/upload", {
      method: "POST",
      body: data
    })
    .then(res=>res.json())
    .then((data)=>{
      setUrl(data.url)
    })
    .catch((err)=>{
      console.log(err)
      setClick(false)
    })
  }

  function postSignUp(){
    setClick(true)
    const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    console.log(regex.test(email))
    if(!regex.test(email)){
      M.toast({html: "invalid email",classes:"red darken-3"})
      setClick(false)
      return
    }
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json"
      },
      body: JSON.stringify({
        name,
        password,
        email,
        picture: url
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        M.toast({html: data.error, classes: "red darken-1"})
        setClick(false)
      } else {
        M.toast({html: data.success, classes: "green accent-3"})
        history.push("/login")
      }
    })
  }

  function PostData() {
    setClick(true)
    if(picture) {
      uploadPic()
    } else {
      postSignUp()
    } 
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
          maxLength="10"
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
          value={password}
          onChange={(e)=>setpassword(e.target.value)}
        />
        <div className="file-field input-field">
          <div className="btn #64b5f6 blue darken-1">
            <span>Upload pic</span>
            <input 
              type="file"
              onChange={(e)=>setpicture(e.target.files[0])} 
            />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <button className="btn blue darken-1 waves-light waves-effect" onClick={(e) => (PostData())} disabled={click}>
          Sign Up
        </button>
        <h5><Link to="/login">Already have an account?</Link></h5>
      </div>
    </div>
  )
}

export default SignUp

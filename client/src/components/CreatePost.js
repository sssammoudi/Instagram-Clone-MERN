import React, {useState} from 'react'
import {useHistory} from "react-router-dom"
import M from "materialize-css"

const CreatePost = () => {
  const history = useHistory()
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const submitData = {};

  function ImgUpload() {
    const data = new FormData();
    data.append("file", image)
    data.append("upload_preset", "instaClone")
    data.append("cloud_name", "dcyfsjd")
    fetch("https://api.cloudinary.com/v1_1/dcyfsjd/image/upload", {
      method: "POST",
      body: data
    })
    .then(res=>res.json())
    .then((data)=>{
      console.log(data)
      submitData.picture = data.url || "none"
      addDB()
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  function addDB(){
    submitData.title = title
    submitData.body = body || " "
    console.log(submitData)
    fetch("/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        "Authorization": "Bearer "+localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        title: submitData.title, 
        body: submitData.body,
        picture: submitData.picture, 
      })
    })
    .then(res => res.json())
    .then(data => {
      if(data.error) {
        M.toast({html: data.error, classes: "red darken-1"})
      } else {
        M.toast({html: data.success, classes: "green accent-3"})
        history.push("/")
      }
    })
  }

  function PostPost() {
    if(!title) {
      return M.toast({html: "Fill the title", classes: "red darken-1"})
    } else if(!body && !image) {
      return M.toast({html: "Fill the missing field", classes: "red darken-1"})
    }
    if(image) {
      return ImgUpload()
    } else if(!image && body) {
      return addDB()
    }
  }

  return (
    <div className="card input-filled  black CreatePost-Card">
      <h2>Create New Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        maxLength="12"
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={(e)=>setBody(e.target.value)}
        maxlength="100"
      />
      <div className="file-field input-field">
        <div className="btn blue darken-1">
          <span>Upload Image</span>
          <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} accept=".jpg, .jpeg, .png"/>
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>
      </div>
      <button className="btn blue darken-1" onClick={(e)=>{PostPost()}}>Post</button>
    </div>
  )
}

export default CreatePost

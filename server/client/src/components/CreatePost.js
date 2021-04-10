import React, {useState, useEffect, useContext} from 'react'
import {useHistory} from "react-router-dom"
import M from "materialize-css"
import Camera from 'react-html5-camera-photo';
import {UserContext} from "../App"
import 'react-html5-camera-photo/build/css/index.css';

const CreatePost = () => {
  const baseData = JSON.parse(sessionStorage.getItem("data"))
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [click, setClick] = useState(false);
  const [takePic, setTakePic] = useState(false);
  const submitData = {};

  useEffect(() => {
    if(baseData) {
      setTitle(baseData.title)
      setBody(baseData.body)
      setImage(baseData.picture)
      submitData.picture = baseData.picture
    }
  }, [])

  

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
    if(baseData) {
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
          fetch(`/deletepost/${baseData._id}`, {
            method:"DELETE",
            headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt"),
              "_id": state._id,
              "picture": false
            },
          })
          .then(res=>res.json())
          .then(result_=>{
            console.log(1)
          })
          .catch((err)=>{
            console.log(err)
          })
          history.push("/")
        }
      })
    } else {
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
  }

  function PostPost() {
    if(!title) {
      return M.toast({html: "Fill the title", classes: "red darken-1"})
    } else if(!body && !image) {
      return M.toast({html: "Fill the missing field", classes: "red darken-1"})
    }
    if(image && !submitData.picture) {
      setClick(true)
      return ImgUpload()
    } else if(body) {
      setClick(true)
      return addDB()
    }
  }
  
  const handleCameraError = (error) => {
    console.log('handleCameraError', error);
  }

  return (
    <div className="CreatePost-Card">
      <div className="card input-filled black CreatePost-Card">
        <h2>Create New Post</h2>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e)=>{setTitle(e.target.value); setTakePic(false);}}
          maxLength="14"
        />
        <input
          type="text"
          placeholder="body"
          value={body}
          onChange={(e)=>{setBody(e.target.value); setTakePic(false);}}
        />
        <div className="file-field input-field">
          <div>
            <button className="btn blue darken-1 file-chooser" onClick={(e) => {setTakePic(true)}}>Take Photo</button>
          </div>
        </div>
        <br/><br/>
        <div className="file-field input-field">
          <div className="btn blue darken-1 file-chooser">
            <span>Upload Image</span>
            <input type="file" onChange={(e)=>{setImage(e.target.files[0])}} accept=".jpg, .jpeg, .png"/>
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" value={image ? (image.name ? image.name : 'photo.png') : ''} onChange={(e)=>{console.log(e.target.files)}}/>
          </div>
        </div>
        <button className="btn blue darken-1" onClick={(e)=>{PostPost(); e.target.disabled=click;}}>Post</button>
      </div>
      {takePic ? 
        <Camera
          onTakePhoto = {(Photo) => {setImage(Photo);}}
          onCameraError = {(error) => {handleCameraError(error)}}
          idealResolution = {{width: 400, height: 400}}
          imageCompression = {0.97}
        /> : 
        <div></div>
      }
    </div>
  )
}

export default CreatePost

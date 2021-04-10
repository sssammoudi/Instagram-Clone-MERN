import React, {useEffect, useState, useContext} from 'react'
import icon from "./images/profile-pic.png"
import {UserContext} from "../App"
import {useHistory} from "react-router-dom"

function Profile() {
  const {state, dispatch} = useContext(UserContext)
  const user = JSON.parse(localStorage.getItem("user"))
  const history = useHistory()
  const [myPosts, setMyPosts] = useState([])
  const [edit, setEdit] = useState(false)
  const [editUser, setEditUser] = useState({name: state.name ? state.name : "name", picture: state.picture ? state.picture : icon})
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch("/userPost", {
      method: "GET",
      headers:{
        "Authorization":"Bearer " + localStorage.getItem("jwt"),
      }
    })
    .then(res => res.json())
    .then(result=>{
      setMyPosts(result.myPost)
    })
  }, [])

  const submitEdit = () => {
    if(editUser) {
      if(image) {
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
          if(editUser.picture!==icon) {
            fetch("/deleteIcon", {
              method: "DELETE",
              headers: {
                "Content-Type": "Application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt"),
              },
              body: JSON.stringify({
                picture: editUser.picture
              })
            })
          }
          setEditUser({picture: data.url})
          fetch("/update", {
            method: "POST",
            headers: {
              "Content-Type": "Application/json",
              "Authorization":"Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
              name: editUser.name,
              picture: data.url,
            })
          })
          .then(res => res.json())
          .then(result=>{
            localStorage.setItem("user",JSON.stringify({...state, picture: result.picture, name: result.name}))
            dispatch({type:"UPDATEPIC", payload: {
              picture: result.picture,
              name: editUser.name
            }})
          })
        })
        .catch((err)=>{
          console.log(err)
        })
      } else {
        fetch("/update", {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt"),
          },
          body: JSON.stringify({
            name: editUser.name,
            picture: state.picture ? state.picture : icon,
          })
        })
        .then(res => res.json())
        .then(result=>{
          console.log(result)
          localStorage.setItem("user",JSON.stringify({...state, picture: result.picture, name: result.name}))
          dispatch({type:"UPDATEPIC", payload: {
            picture: result.picture,
            name: editUser.name
          }})
        })
      }
      setEdit(false)
    }
  }

  const editProfile = () => {
    if(edit){
      return setEdit(false)
    }
    return setEdit(true)
  }

  return (
    <div className="profile">
      {edit && 
        <div className="edit-profile">
          <button className="btn btn-close" onClick={(e) => {editProfile()}}>Close</button>
          <div>
          <div className="info-avatar">
            <label>
              <img src={editUser.picture} alt="avatar"/>
              <input type="file" className="file-up"  onChange={(e)=>{setImage(e.target.files[0])}} accept=".jpg, .jpeg, .png" style={{display: "none"}}/>
            </label>
          </div>
            <div className="form-group">
              <label htmlFor="name">name</label>
              <input
                name="name"
                type="text"
                placeholder="name"
                className="form-control"
                value={editUser.name ? editUser.name : ""}
                onChange={(e) => {setEditUser({name: e.target.value})}}
              />
            </div>
            <button className="btn btn-submit" type="submit" onClick={(e) => {submitEdit()}}>Save</button>
          </div>
        </div>
      }
      <div className="profile-header">
        <div>
          <img style={{width: "120px", height: "120px", borderRadius: "100px", marginRight:"20px"}} src={state ? (state.picture ? state.picture : icon) : icon} alt="title" />
          <div>
            <button className="btn blue darken-1" onClick={(e) => {editProfile()}} disabled={edit}>Edit Profile</button>
          </div>
        </div>
        <div className="profileData">
          <h4>{state ? state.name : "loading..."}</h4>
          <h5>{state ? state.email : "loading..."}</h5>
          <div className="profile-data">
            <h6>{user ? user.followers.length : "loading..." } Followers</h6>
            <h6>{user ? user.following.length : "loading..." } Folowing</h6>
            <h6>{myPosts ? myPosts.length : 0} Posts</h6>
          </div>
        </div>
        <br />
      </div>
      <div className="profile-gallery">
        {myPosts.map(post=>{
          return post.picture ? (
            <img className="gallery-item" key={post._id} src={post.picture} alt={post.title} onClick={(e)=>{history.push("/post/"+post._id)}}/>
          ) : (
            <h3 className="gallery-item" key={post._id} onClick={(e)=>{history.push("/post/"+post._id)}}>{post.title}</h3>
          )})
        }
      </div>
    </div>
  )
}

export default Profile

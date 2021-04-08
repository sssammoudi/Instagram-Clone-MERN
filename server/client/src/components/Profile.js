import React, {useEffect, useState, useContext} from 'react'
import icon from "./images/profile-pic.png"
import {UserContext} from "../App"
import {useHistory} from "react-router-dom"

function Profile() {
  const {state, dispatch} = useContext(UserContext)
  const user = JSON.parse(localStorage.getItem("user"))
  const history = useHistory()
  const [myPosts, setMyPosts] = useState([])
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
  })
  return (
    <div className="profile">
      <div className="profile-header">
        <div>
          <img style={{width: "120px", height: "120px", borderRadius: "100px", marginRight:"20px"}} src={state && state.picture ? state.picture : icon} alt="title" />
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

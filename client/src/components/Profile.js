import React, {useEffect, useState, useContext} from 'react'
import icon from "./images/profile-pic.png"
import {UserContext} from "../App"

const Profile = () => {
  const {state,dispatch} = useContext(UserContext)
  const [myPosts, setMyPosts] = useState([])
  useEffect(() => {
    fetch("/userPost", {
      method: "GET",
      headers:{
        "Authorization":"Bearer " + localStorage.getItem("jwt")
      },
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
          <img style={{width: "160px", height: "160px", borderRadius: "100px"}} src={state && state.picture ? state.picture : icon} alt="title" />
        </div>
        <div>
          <h4>{state ? state.name : "loading..."}</h4>
          <h5>{state ? state.email : "loading..."}</h5>
          <div className="profile-data">
            <h6>Followers</h6>
            <h6>Folowing</h6>
            <h6>{myPosts ? myPosts.length : 0} Posts</h6>
          </div>
        </div>
        <br />
      </div>
      <div className="profile-gallery">
        {myPosts.map(post=>{
          return post.picture ? (<img className="gallery-item" key={post._id} src={post.picture} alt={post.title}/>) : (<h3 className="gallery-item" key={post._id}>{post.title}</h3>)
        })}
        
      </div>
    </div>
  )
}

export default Profile

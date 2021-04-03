import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import icon from "../images/profile-pic.png"

function UserProfile(props) {
  const history = useHistory()
  const [userPosts, setUserPosts] = useState([])
  const [userData, setUserData] = useState()
  useEffect(() => {
    fetch(`/user/${props.match.params.id}`, {
      method: "GET",
      headers:{
        "Authorization":"Bearer " + localStorage.getItem("jwt")
      },
    })
    .then(res => res.json())
    .then(result=>{
      setUserData(result.user)
      setUserPosts(result.posts)
    })
  }, []);
  return userData ? (
    <div className="profile">
      <div className="profile-header">
        <div>
          <img style={{width: "120px", height: "120px", borderRadius: "100px"}} src={userData.picture ? userData.picture :icon} alt="title" />
        </div>
        <div>
          <h4>{userData.name}</h4>
          {/* <h5>{"loading..."}</h5> */}
          <div className="profile-data">
            <h6>Followers</h6>
            <h6>Folowing</h6>
            <h6>{userPosts ? userPosts.length : 0} Posts</h6>
          </div>
        </div>
        <br />
      </div>
      <div className="profile-gallery">
        {userPosts.map(post=>{
          return post.picture ? (
            <img className="gallery-item" key={post._id} src={post.picture} alt={post.title} onClick={(e)=>{history.push("/post/"+post._id)}}/>
          ) : (
            <h3 className="gallery-item" key={post._id} onClick={(e)=>{history.push("/post/"+post._id)}}>{post.title}</h3>
          )})
        }
      </div>
    </div>
  ) : <h1>Loading...</h1>
}

export default UserProfile

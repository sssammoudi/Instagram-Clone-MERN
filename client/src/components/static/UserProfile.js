import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from "react-router-dom"
import icon from "../images/profile-pic.png"
import {UserContext} from "../../App"

function UserProfile(props) {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  const [userPosts, setUserPosts] = useState([])
  const [userData, setUserData] = useState()
  const [followed, setNotFollowed] = useState(state ? !state.following.includes(props.match.params.id) : true)
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

  const followUser = ()=>{
    fetch("/follow", {
      method: "PUT",
      headers: {
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        followId: props.match.params.id,
      })
    })
    .then(res=>res.json())
    .then(result=>{
      console.log(result)
      setNotFollowed(false)
      dispatch({type:"UPDATE", result})
    }).catch(err=>{
      console.log(err)
    })
  }

  const unFollowUser = ()=>{
    fetch("/unfollow", {
      method: "PUT",
      headers: {
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        unfollowId: props.match.params.id,
      })
    })
    .then(res=>res.json())
    .then(result=>{
      console.log(result)
      setNotFollowed(true)
      dispatch({type:"USER", result})
    }).catch(err=>{
      console.log(err)
    })
  }

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
            <h6>{userData.followers.length} Followers</h6>
            <h6>{userData.following.length} Folowing</h6>
            <h6>{userPosts ? userPosts.length : 0} Posts</h6>
          </div>
          {followed ?
            <button style={{margin:"10px"}} className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={(e)=>{followUser()}}>Follow</button>
          : 
            <button style={{margin:"10px"}} className="btn waves-effect waves-light #64b5f6 blue darken-1" onClick={(e)=>{unFollowUser()}}>UnFollow</button>
          }
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

import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from "react-router-dom"
import icon from "../images/profile-pic.png"
import {UserContext} from "../../App"
import followedImg from "../images/followed.png"
import followImg from "../images/follow.png"
import {PostNotify} from "../../actions/Notify/Post"

function UserProfile(props) {
  const user = JSON.parse(localStorage.getItem("user"))
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  const [userPosts, setUserPosts] = useState([])
  const [userData, setUserData] = useState()
  const [followed, setNotFollowed] = useState(user.followers ? !user.following.includes(props.match.params.id) : true)
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
    .then((result)=>{
      const msg = {
        recipient: props.match.params.id, 
        url: "/profile/"+state._id,
        text: state.name+" started following you", 
        content: null, 
        image: state.picture ? state.picture : icon
      }
      PostNotify({msg:msg})
      setNotFollowed(false)
      dispatch({type:"UPDATE", payload: {
        following: result.following,
        followers: result.followers
      }})
      setUserData(result.result)
      console.log(user)
      localStorage.setItem("user", JSON.stringify(result.resu))
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
    .then((result)=>{
      setNotFollowed(true)
      dispatch({type:"UPDATE", payload: {
        following: result.following,
        followers: result.followers
      }})
      setUserData(result.result)
      localStorage.setItem("user", JSON.stringify(result.resu))
    }).catch(err=>{
      console.log(err)
    })
  }

  return userData ? (
    <div className="profile">
      <div className="profile-header">
        <div>
          <img style={{width: "120px", height: "120px", borderRadius: "100px"}} src={userData.picture ? userData.picture : icon} alt="title" />
        </div>
        <div>
          <h4>{userData.name}</h4>
          <div className="profile-data">
            <h6>{userData.followers ? userData.followers.length : 0} Followers</h6>
            <h6>{userData.following ? userData.following.length : 0} Folowing</h6>
            <h6>{userPosts ? userPosts.length : 0} Posts</h6>
          </div>
          {followed ?
            <img src={followImg} className="Follow-btn" width="50px" height="50px" onClick={(e)=>{followUser()}}/>
          : 
            <img src={followedImg} className="Follow-btn" width="50px" height="50px" onClick={(e)=>{unFollowUser()}}/>
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

import React, {useEffect, useState} from 'react'
import icon from "./images/profile-pic.png"

const Profile = () => {
  const [imgUrl, setImgUrl] = useState(icon);
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
  }, [])
  return (
    <div className="profile">
      <div className="profile-header">
        <div>
          <img style={{width: "160px", height: "160px", borderRadius: "100px"}} src={imgUrl} alt="title" />
        </div>
        <div>
          <h4>Username</h4>
          <div className="profile-data">
            <h6>Followers</h6>
            <h6>Folowing</h6>
            <h6>Posts</h6>
          </div>
        </div>
      </div>
      <div className="profile-gallery">
        {myPosts.map(post => {
          <img key={post._id} className="post" src={myPosts.picture} alt={post.title}/>  
        })}
      </div>
    </div>
  )
}

export default Profile

import React, {useState} from 'react'
import icon from "./images/profile-pic.png"

const Profile = () => {
  const [imgUrl, setImgUrl] = useState(icon);
  return (
    <div className="profile">
      <div className="profile-header">
        <div>
          <img style={{width: "160px", height: "160px", borderRadius: "100px"}} src={imgUrl} />
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

      </div>
    </div>
  )
}

export default Profile

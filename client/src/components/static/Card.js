import React from 'react'
import "../../index.css"
import icon from "../images/profile-pic.png"

const Card = (post) => {
  const data = post.post

  return (
    <div className="card home-card">
      <header className="header-Post">
        <div className="headerPost">
          <img src={data.postedBy.picture ? data.postedBy.picture : icon} className="headerPost-Picture"/>
          <div className="header-content">
            <h5 style={{padding:"5px"}}>{data.postedBy.name}</h5>
          </div>
        </div>
      </header>
      <div className="card-content grey darken-4">
        <h3><strong>{data.title}</strong></h3>
        {data.picture ?
          (<div>
            <div className="card-image">
              <img src={data.picture} />
            </div>
            <br />
            <div className="text-card">
              <h6>{data.body}</h6>
            </div>
          </div>) : (
            <div className="text-card">
              <h4>{data.body}</h4>
            </div>
          )
        }
        <div className="card-opinion">
          <i className="material-icons">thumb_down</i>
          <i className="material-icons">thumb_up</i>
          <input type="text" placeholder="Add a comment..."/>
        </div>
      </div>
    </div>
  )
}

export default Card

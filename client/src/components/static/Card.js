import React from 'react'

const Card = ({post}) => {
  const 
  return (
    <div className="card home-card grey darken-4">
      <h5>{poster}</h5>
      <div className="card-content">
        <div className="card-title">
          {title}
        </div>
        <div className="text-card">
          {text}
        </div>
      </div>
      {picture &&
        <div className="card-image">
          <img src={src} />
        </div>
      }
      <div className="card-opinion">
        <i className="material-icons">thumb_down</i>
        <i className="material-icons">thumb_up</i>
        <input type="text" placeholder="Add a comment..."/>
      </div>
    </div>
  )
}

export default Card

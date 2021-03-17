import React from 'react'

const Card = ({post}) => {
  const 
  return (
    <div className="card home-card">
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
    </div>
  )
}

export default Card

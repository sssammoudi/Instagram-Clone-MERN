import React, {useState, useEffect} from 'react'
import Card from "./static/Card"

function FollowingsPost() {
  const [data,setData] = useState([])
  useEffect(() => 
    fetch("/followingsPost", {
      method: "GET",
      headers:{
        "Authorization":"Bearer " + localStorage.getItem("jwt")
      },
    })
    .then(res => res.json())
    .then(result=>{
      setData(result.posts)
  }, []))

  return (
    <div>
      {data.map(post => (
        <Card post={post}  key={post._id} postedBy={post.postedBy} />
      ))}
    </div>
  )
}

export default FollowingsPost

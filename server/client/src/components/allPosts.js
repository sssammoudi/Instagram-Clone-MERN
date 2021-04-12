import React, {useState, useEffect} from 'react'
import Card from './static/Card'
import {useHistory} from "react-router-dom"

const AllPosts = () => {
  const history = useHistory()
  const [data,setData] = useState([])

  useEffect(() => {
    fetch("/allPosts", {
      method: "GET",
      headers:{
        "Authorization":"Bearer " + localStorage.getItem("jwt")
      },
    })
    .then(res => res.json())
    .then(result=>{
      setData(result.posts)
    })
  }, [])
  return data ? (
    <div className="profile-gallery" style={{marginTop:"30px"}}>
      {data.map(post => {
        return post.picture ? (
          <img className="gallery-item" key={post._id} src={post.picture} alt={post.title} onClick={(e)=>{history.push("/post/"+post._id)}}/>
        ) : (
          <h3 className="gallery-item" key={post._id} onClick={(e)=>{history.push("/post/"+post._id)}}>{post.title}</h3>
        )})}
    </div>
  ) : <h1>Loading...</h1>
}

export default AllPosts


import React, {useState, useEffect} from 'react'
import Card from './static/Card'
import {useHistory} from "react-router-dom"

function OnePost(props) {
  const [post, setPost] = useState()
  const history = useHistory()
  useEffect(() => {
    fetch(`/GetPost/${props.match.params.id}`, {
      method: "GET",
      headers:{
        "Authorization":"Bearer " + localStorage.getItem("jwt")
      },
    })
    .then(res => res.json())
    .then(result=>{
      setPost(result.post)
      console.log(post)
    })
    .catch(error=>{
      console.log(error)
    })
  }, [])
  return post ? 
    <div>
      <Card post={post}  key={post._id} postedBy={post.postedBy}/>
    </div>
  : <div></div>
}

export default OnePost

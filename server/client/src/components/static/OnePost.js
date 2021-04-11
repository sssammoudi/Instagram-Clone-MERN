import React, {useState, useEffect} from 'react'
import Card from './Card'
import {useHistory} from "react-router-dom"
import {Button} from "@material-ui/core"

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
    })
    .catch(error=>{
      console.log(error)
    })
  }, [])
  return post ? 
    <div>
      <Button variant="contained" color="primary" className="Back-btn" onClick={(e)=>{history.goBack()}}>Go Back</Button>
      <Card post={post}  key={post._id} postedBy={post.postedBy}/>
    </div>
  : <div></div>
}

export default OnePost

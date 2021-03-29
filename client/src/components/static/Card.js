import React, { useContext, useState, useEffect } from 'react'
import "../../index.css"
import icon from "../images/profile-pic.png"
import heart from "../images/like.png"
import {UserContext} from "../../App"
import M from "materialize-css"

const Card = (post) => {
  const [data, setData] = useState(post.post)
  const {state, dispatch} = useContext(UserContext)
  const [liked, setLiked] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [commentText, setCommentText] = useState("")

  useEffect(() => {
    fetch('/liked',{
      method: "PUT",
      headers: {
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: data._id,
        _id: state._id
      })
  })
  .then(res=>res.json())
  .then(result=>{
    setLiked(result)
  }).catch(err=>{
    console.log(err)
  })
  }, [data]);

  const likePost = ()=>{
    fetch('/like',{
      method: "PUT",
      headers: {
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        postId: data._id,
        _id: state._id
      })
    })
    .then(res=>res.json())
    .then(result=>{
      const newData = () => {
        if(data._id===result._id){
          return result
        } else {
          return data
        }
      }
      setData(newData)
    }).catch(err=>{
      console.log(err)
    })

    setClicked(true)
    setTimeout(() => {
      setClicked(false)
    }, 500)
  }

  const unLikePost = ()=>{
    setLiked(false)
    fetch('/unlike',{
        method: "PUT",
        headers: {
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          postId: data._id,
          _id: state._id
        })
    })
    .then(res=>res.json())
    .then(result=>{
      const newData = () => {
        if(data._id===result._id){
          return result
        } else {
          return data
        }
      }
      setData(newData)
    }).catch(err=>{
      console.log(err)
    })
  }

  const comment = () => {
    fetch('/comment', {
      method: "PUT",
        headers: {
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          postId: data._id,
          commentText
        })
      })
    .then(res=>res.json())
    .then(result=>{
      const newData = () => {
        if(data._id===result._id){
          return result
        } else {
          return data
        }
      }
      setData(newData)
    }).catch(err=>{
      console.log(err)
    })
  }

  const deletePost = () => {
    fetch(`/deletepost/${data._id}`, {
      method:"delete",
      headers:{
        Authorization:"Bearer "+localStorage.getItem("jwt"),
        _id: state._id
      },
    })
    .then(res=>res.json())
    .then(result=>{
      setData(data._id !== result._id ? result : data)
      M.toast({html: "Deleted Successfully", classes: "green accent-3"})
    })
  }

  return data && (
    <div className="card home-card">
      <header className="header-Post">
        <div className="headerPost">
          <div className="headerImage">
            <img src={state.picture ? state.picture : icon}/>
          </div>
          <div className="header-content">
            <h5 style={{padding:"0px"}}>
              {state.name}
              {state._id===data.postedBy || state._id===data.postedBy._id && (
                <i className="material-icons" style={{float:"right"}} onClick={()=>deletePost()}>delete</i>  
              )}
            </h5>
            <h3><strong style={{fontSize: "35px"}}>{data.title}</strong></h3>
          </div>
        </div>
      </header>
      <div className="card-content grey darken-4">
        {data.picture ?
          (<div>
            <div className="card-image" onDoubleClick={(e)=>{likePost()}}>
              <img src={data.picture} />
              <span className="heart-icon">
                {clicked && <img src={heart} style={{width:"100px"}}/>}
              </span>
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
          <i className={liked ? "liked material-icons" : "material-icons"} onClick={(e)=>{likePost()}}>thumb_up</i>
          <i className={!liked ? "disliked material-icons" : "material-icons"} onClick={(e)=>{unLikePost()}}>thumb_down</i>
          <h6>{data.likes.length} likes</h6>
          <div className="comments">
            {data.comments.map(cmt=>{
              return(
                <h6 key={cmt._id}><span style={{fontWeight:"500"}}>{cmt.postedBy.name}</span> {cmt.text}</h6>
              )
            })}
          </div>
          <form onSubmit={(e)=>{
            e.preventDefault()
            comment()
          }}>
            <input type="text" placeholder="add a comment" onChange={(e)=>{setCommentText(e.target.value)}}/>  
          </form>
        </div>
      </div>
    </div>
  )
}

export default Card

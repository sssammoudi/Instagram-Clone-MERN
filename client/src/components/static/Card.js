import React, { useContext, useState, useEffect } from 'react'
import "../../index.css"
import icon from "../images/profile-pic.png"
import heart from "../images/like.png"
import {UserContext} from "../../App"
import M from "materialize-css"
import ShareIcon from '@material-ui/icons/Share';
import Copy from 'clipboard-react'
import {Link} from "react-router-dom"

const Card = ({post, postedBy}) => {
  const [data, setData] = useState(post)
  const {state, dispatch} = useContext(UserContext)
  const [liked, setLiked] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [commentText, setCommentText] = useState("")

  useEffect(() => {
    if(data) {
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
    }
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
      const newData = result
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
      const newData = result
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
      setCommentText("")
      const newData = result
      setData(newData)
    }).catch(err=>{
      console.log(err)
    })
  }

  const deletePost = () => {
    fetch(`/deletepost/${data._id}`, {
      method:"DELETE",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt"),
        "_id": state._id
      },
    })
    .then(res=>res.json())
    .then(result_=>{
      setData(null)
      M.toast({html: "Deleted Successfully", classes: "green accent-3"})
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  
  const deleteComment = (id) => {
    fetch(`/deletecomment`, {
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: data._id,
        _id: id
      })
    })
    .then(res=>res.json())
    .then(result=>{
      setData(result)
      M.toast({html: "Deleted Successfully", classes: "green accent-3"})
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  return data ? (
    <div className="card home-card">
      <header className="header-Post">
        <div className="headerPost">
          <div className="headerImage">
            <img src={postedBy.picture ? postedBy.picture : icon}/>
          </div>
          <div className="header-content">
            <h5 style={{padding:"0px"}}>
              <Link to={"/profile/"+postedBy._id} style={{color:"white"}}>
                {postedBy.name}
              </Link>
              {state._id===postedBy._id && (
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
                {clicked && <img src={heart} style={{width:"100px"}} loading="lazy"/>}
              </span>
            </div>
            <br />
            <div className="text-card text-card2">
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
          <Copy text={window.location+"post/"+post._id} onSuccess={() => alert('link copied to clipboard')} onError={() => alert('Failed')}><ShareIcon /></Copy>
          <h6>{data.likes ? data.likes.length : 0} likes</h6>
          <div className="comments">
            {data.comments.map(cmt=>{
              return (
                <h6 key={cmt._id}>
                  <span style={{fontWeight:"500"}}>{cmt.postedBy.name} </span>
                  {cmt.text}
                  {state._id===cmt.postedBy._id && (
                    <i className="material-icons" style={{float:"right"}} onClick={()=>deleteComment(cmt._id)}>delete</i>  
                  )}
                </h6>
              )
            })}
          </div>
          <form onSubmit={(e)=>{
            e.preventDefault()
            comment()
          }}>
            <input type="text" placeholder="add a comment..." onChange={(e)=>{setCommentText(e.target.value)}} value={commentText}/>
          </form>
        </div>
      </div>
    </div> 
  ) : <div></div>
}

export default Card

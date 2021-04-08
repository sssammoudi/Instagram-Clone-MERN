import React, {useState, useEffect, useContext} from 'react'
import Card from './static/Card'

const Home = () => {
  const [data,setData] = useState([])

  useEffect(() => 
    fetch("/allPosts", {
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
    <div className="home">
      {data.map(post => (
        <Card post={post}  key={post._id} postedBy={post.postedBy} />
      ))}
    </div>
  )
}

export default Home


import React, {useState, useEffect} from 'react'
import Card from './static/Card'

const Home = () => {
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
    <div className="home">
      {data.map((post) => {
        return(
          <Card post={post}  key={post._id} postedBy={post.postedBy} />
        )
      })}
    </div>
  ) : <h1>Loading...</h1>
}

export default Home


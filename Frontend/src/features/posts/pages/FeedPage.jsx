import React,{useEffect} from 'react'
import '../style/feed.scss' 
import { usePost } from '../hook/usePost'
import Post from '../components/Post'
const FeedPage = () => {
  const {loading, feed,handleGetFeed} = usePost()

  useEffect(()=>{
    handleGetFeed()
  },[])
  if(loading || !feed){
    return( <main>
    <h1>
        Feed is Loading...
    </h1>
    </main>)
  }

  return (
    
     <main className="feed-page">
    <div className="feed">
        <div className="posts">
        {feed.map((post)=>{
            return <Post user={post.user} post={post} />
        })}
        </div>
    </div>
  </main>
  )
}

export default FeedPage
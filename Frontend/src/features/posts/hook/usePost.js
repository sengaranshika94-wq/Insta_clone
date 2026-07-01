import { useContext } from "react"
import { PostContext } from "../post.context"
import {getFeed} from '../services/post.api'

export const usePost = ()=>{
    const {post,setPost,loading,setLoading,feed,setFeed} = useContext(PostContext)
    
    const handleGetFeed = async ()=>{
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }
    return {loading,post,feed,handleGetFeed}
}
import { useContext } from "react"
import { PostContext } from "../post.context"
import {getFeed , createPost, likePost, unlikePost} from '../services/post.api'

export const usePost = ()=>{
    const {post,setPost,loading,setLoading,feed,setFeed} = useContext(PostContext)
    
    const handleGetFeed = async ()=>{
        setLoading(true)
        const data = await getFeed()
        setFeed(data.posts)
        setLoading(false)
    }

    const handleCreatePost = async (imagefile, caption )=>{
        setLoading(true)
        const data = await createPost(imagefile , caption)
         setFeed([data.post,...feed])
         setLoading(false)
    }

    const handleLikes = async (post)=>{
        
        const data = await likePost(post)
        await handleGetFeed()
        
    }

    const handleunLikes = async (post)=>{
        
        const data = await unlikePost(post)
        await handleGetFeed()
        
    }
    
    return {loading,post,feed,handleGetFeed, handleCreatePost, handleLikes, handleunLikes}
}
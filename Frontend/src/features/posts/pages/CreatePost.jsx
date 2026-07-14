import React, {useState,useRef} from 'react'
import '../style/create.post.scss'
import { usePost } from '../hook/usePost'
import { useNavigate} from 'react-router'

const CreatePost = () => {
    const [caption, setCaption] = useState('')
    const postImageRef = useRef(null)
    const {loading,handleCreatePost}= usePost() 
    const navigate = useNavigate()

    async function handleSubmit(e){
        e.preventDefault()
        const file = postImageRef.current.files[0]
        await handleCreatePost(file,caption)
        navigate('/')
    }

    if(loading){
        return (
            <main>
                <h1>creating post ...</h1>
            </main>
        )
    }
  return (
    <main>
        <div className="create-post-container">
            <div className="form-container">
                <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="img" className='create-post-label'>Upload Image</label>
                <input ref={postImageRef} hidden type="file" accept='image/* ' id="img" />
                <input 
                type="text" 
                placeholder='Enter caption'
                value={caption}
                onChange ={(e)=>{setCaption(e.target.value)}}
                />
                <button className='button primary-button'>Post</button>
            </form>
            </div>
        </div>
    </main>
  )
}

export default CreatePost
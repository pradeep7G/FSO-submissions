import React,{ useState,useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog,removeBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { useHistory, useParams } from 'react-router-dom'

const Blog=() => {
  const [blog,setBlog]=useState(null)
  const dispatch = useDispatch()
  const history=useHistory()
  const id=useParams().id

  useEffect(() => {
    const getBlog = async () => {
      const blog=await blogService.getOne(id)
      setBlog(blog)
    }
    getBlog()
  },[])

  const handleLike=async (blog) => {
    const likedBlog={ ...blog,likes:blog.likes+1 }
    dispatch(likeBlog(likedBlog))
    setBlog(likedBlog)
  }
  const handleRemove=async (blog) => {
    dispatch(removeBlog(blog))
    history.push('/')
    setBlog(null)
  }

  if(blog)
  {
    return (
      <div className='blog'>
        <div>
          <h2><i>{blog.title}</i> {blog.author} </h2>
        </div>
        <div>
          <a href={`${blog.url}`}>{blog.url}</a>
          <div>likes {blog.likes}
            <button onClick={() => handleLike(blog)}>Like</button>
          </div>
          <div>
         added {blog.user.name}
          </div>
          <button onClick={() => handleRemove(blog)}>remove</button>
        </div>
      </div>
    )
  }
  return null
}
export default Blog
import React,{ useState,useEffect } from 'react'
import uuid from 'react-uuid'
import { useDispatch } from 'react-redux'
import { commentBlog, likeBlog,removeBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import { useHistory, useParams } from 'react-router-dom'
import { Button, Form, } from 'react-bootstrap'
import { setNotification } from '../reducers/notificationReducer'

const CommentForm = ({ handleComment }) => {
  return (
    <div>
      <Form onSubmit={handleComment}>
        <Form.Group>
          <Form.Label>comment</Form.Label>
          <Form.Control type="text" id="comment" name="name" />
        </Form.Group>
        <Button variant="primary" type="submit">
          add comment
        </Button>
      </Form>
    </div>
  )
}

const Blog=() => {
  const [blog,setBlog]=useState(null)
  const dispatch = useDispatch()
  const history=useHistory()
  const id=useParams().id

  useEffect(() => {
    let unmounted=true
    const getBlog = async () => {
      const blog=await blogService.getOne(id)
      setBlog(blog)
    }
    getBlog()
    return () => unmounted=false
  },[])

  const handleComment =async (event) => {
    event.preventDefault()
    const comment=event.target.comment.value
    event.target.comment.value=''
    if(!(comment==='' || comment===null))
    {
      dispatch(commentBlog(blog,comment))
        .then(res => {
          const updatedBlog={ ...blog,comments:blog.comments.concat(comment) }
          dispatch(setNotification('added a comment','success',5))
          setBlog(updatedBlog)
        })
        .catch(e => {
          dispatch(setNotification('session expired','error',5))
        })
    }
    else
    {
      dispatch(setNotification('comment can\'t be empty','error',5))
      return null
    }
  }

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
            <Button className="ml-2"  variant="primary" onClick={() => handleLike(blog)}>Like</Button>
          </div>
          <div>
          added by {blog.user.name}
          </div>
          <Button className="m-1" variant="primary" onClick={() => handleRemove(blog)}>remove</Button>
        </div>
        <CommentForm handleComment={handleComment}/>
        {blog.comments.length!==0 && <h4>comments</h4>}
        <ul>
          {
            blog.comments.map(comment => {
              return (
                <li key={uuid()}>{comment}</li>
              )
            })
          }
        </ul>
      </div>
    )
  }
  return null
}
export default Blog
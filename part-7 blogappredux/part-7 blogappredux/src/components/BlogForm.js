import React,{ useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogReducer'

const BlogForm=({ blogFormRef }) => {

  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')

  const dispatch = useDispatch()

  const handleTitle=(event) => {
    setTitle(event.target.value)
  }

  const handleAuthor=(event) => {
    setAuthor(event.target.value)
  }

  const handleUrl=(event) => {
    setUrl(event.target.value)
  }

  const createBlog=async (event) => {
    event.preventDefault()
    dispatch(addBlog({
      title:title,
      author:author,
      url:url,
    }))
    blogFormRef.current.toggleVisibility()
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title: <input id="title" type="text" value={title} onChange={handleTitle}/>
        </div>
        <div>
          author: <input id="author" type="text" value={author} onChange={handleAuthor}/>
        </div>
        <div>
          url: <input id="url" type="text" value={url} onChange={handleUrl}/>
        </div>
        <div>
          <button id="create" type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
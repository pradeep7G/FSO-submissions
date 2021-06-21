import React,{ useState } from 'react'
import PropTypes from 'prop-types'
import Togglable from './Togglable'

const BlogForm=({ createBlog }) => {

  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')

  const handleTitle=(event) => {
    setTitle(event.target.value)
  }

  const handleAuthor=(event) => {
    setAuthor(event.target.value)
  }

  const handleUrl=(event) => {
    setUrl(event.target.value)
  }

  const addBlog=(event) => {
    event.preventDefault()
    createBlog({
      title:title,
      author:author,
      url:url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div className="newBlog">
      <form onSubmit={addBlog}>
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
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

Togglable.propTypes={
  createBlog:PropTypes.func.isRequired
}


export default BlogForm
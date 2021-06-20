import React,{useState} from 'react'

const BlogForm=({createBlog})=>{

  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')

  const handleTitle=(event)=>{
    setTitle(event.target.value)
  }

  const handleAuthor=(event)=>{
    setAuthor(event.target.value)
  }

  const handleUrl=(event)=>{
    setUrl(event.target.value)
  }

  const addBlog=(event)=>{
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
    <div>
        <form onSubmit={addBlog}>
          <div>
          title: <input type="text" value={title} onChange={handleTitle}/>
          </div>
          <div>
          author: <input type="text" value={author} onChange={handleAuthor}/>
          </div>
          <div>
          url: <input type="text" value={url} onChange={handleUrl}/>
          </div>
          <div>
          <button type="submit">create</button>
          </div>
        </form>
      </div>
  )
}

export default BlogForm
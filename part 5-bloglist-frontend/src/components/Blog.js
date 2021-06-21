import React,{ useState } from 'react'
const blogStyle={
  paddingTop:10,
  paddngLeft:2,
  border:'solid',
  borderWidth:1,
  marginBottom:5
}

const BlogBeforeToggle = ({ blog,toggleVisibility,text }) => {

  return (
    <div style={blogStyle} className="before">
      {blog.title} - {blog.author} <button id={text} onClick={() => toggleVisibility()}>{text}</button> <br/>
    </div>
  )
}

const BlogAfterToggle = ({ blog,toggleVisibility,text,updateBlog,deleteBlog }) => {
  const [likes,setLikes]=useState(blog.likes)
  const [del,setDel]=useState(false)
  const handleLikes=() => {
    blog.likes=likes+1
    updateBlog(blog.id,blog)
    setLikes(blog.likes)
  }

  const handleDelete=() => {
    if(window.confirm(`Remove blog ${blog.title}`))
    {
      const res=deleteBlog(blog.id)
      res.then(result => {
        if(result)
          setDel(true)
        else
          setDel(false)
      })
    }
  }

  if(del)
  {
    return null
  }
  else {
    return (
      <div style={blogStyle} className="after">
        {blog.title} - {blog.author} <button id={text} onClick={() => toggleVisibility()}>{text}</button> <br/>
        {blog.url} <br/>
        likes {blog.likes}  <button id="like" onClick={() => handleLikes(updateBlog)}>like</button> <br/>
        {blog.author} <br/>
        <button id="remove" onClick={handleDelete}>remove</button>
      </div>
    )
  }
}

const Blog=({ blog,updateBlog,deleteBlog }) => {
  const [toggle,setToggle]=useState(false)
  const text=toggle?'hide':'view'
  const toggleVisibility=() => {
    setToggle(!toggle)
  }
  return (
    <div className="BlogComponent">
      {toggle
        ?<BlogAfterToggle blog={blog} toggleVisibility={toggleVisibility} text={text} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
        :<BlogBeforeToggle blog={blog} toggleVisibility={toggleVisibility} text={text} />
      }
    </div>
  )
}

export default Blog
import React,{useState} from 'react'

const blogStyle={
    paddingTop:10,
    paddngLeft:2,
    border:'solid',
    borderWidth:1,
    marginBottom:5
  }

const BlogBeforeToggle = ({blog,toggleVisibility,text}) => {

  return (
  <div style={blogStyle}>
    {blog.title} - {blog.author} <button onClick={()=>toggleVisibility()}>{text}</button> <br/>
  </div>  
  )
}

const BlogAfterToggle = ({blog,toggleVisibility,text,updateBlog,deleteBlog}) => {
  const [likes,setLikes]=useState(blog.likes)
  const [del,setDel]=useState(false)
  const handleLikes=()=>{
    blog.likes=likes+1;
    updateBlog(blog.id,blog)
    setLikes(blog.likes)
  }

  const handleDelete=()=>{
    deleteBlog(blog.id)
    setDel(true)
  }

  if(del)
  {
    return null
  }
  else {
  return (
      <div style={blogStyle}>
        {blog.title} - {blog.author} <button onClick={()=>toggleVisibility()}>{text}</button> <br/>
        {blog.url} <br/>
        likes {blog.likes}  <button onClick={()=>handleLikes(updateBlog)}>like</button> <br/>
        {blog.author} <br/>
        <button onClick={handleDelete}>remove</button>
      </div>  
  )
  }
}

const Blog=({blog,updateBlog,deleteBlog})=>{
  const [toggle,setToggle]=useState(false)
  const text=toggle?'hide':'view'
  const toggleVisibility=()=>{
    setToggle(!toggle)
  }
  return (
        toggle
        ?<BlogAfterToggle blog={blog} toggleVisibility={toggleVisibility} text={text} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
        :<BlogBeforeToggle blog={blog} toggleVisibility={toggleVisibility} text={text} />
  )
}

export default Blog
import React from 'react'
const Blog = ({blog}) => {
  return (
  <div>
    {blog.title} - {blog.author}
  </div>  
  )
}

export default Blog
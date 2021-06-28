import React from 'react'
import Blog from './Blog'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const blogStyle={
    paddingTop:10,
    paddngLeft:2,
    border:'solid',
    borderWidth:1,
    marginBottom:5
  }
  return (
    <div>
      {
        blogs.map(blog => (
          <div key={blog.id} style={blogStyle} >
            <Link key={blog.id} to={`blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))
      }
    </div>
  )
}

export default BlogList
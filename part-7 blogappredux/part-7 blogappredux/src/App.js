import React, { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import Notifications from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'


const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser]=useState(null)
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [notification,setNotification]=useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => b.likes-a.likes)
      setBlogs( blogs )
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON=window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      const user=JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const notifyWith=(message,type='success') => {
    setNotification({
      message,type
    })
    setTimeout(() => {
      setNotification(null)
    },5000)
  }

  const handleLogin=async (event) => {

    event.preventDefault()
    try{
      const user=await loginService.login({
        username,password
      })
      window.localStorage.setItem('loggedBlogAppUser',JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notifyWith(`${user.name} welcome back!`)
    }catch(exception){
      notifyWith('wrong username/password','error')
    }

  }

  const addBlog=async (newBlog) => {
    try{
      const returnedBlog=await blogService.create(newBlog)
      blogFormRef.current.toggleVisibility()
      setBlogs(blogs.concat(returnedBlog))
      notifyWith(`a new blog ${returnedBlog.title} by ${user.name} added`)
    }catch(exception){
      console.log(exception)
      notifyWith('you are missing something please ensure that you added title author','error')
    }
  }


  const handleLike=async (id) => {
    try{
      const blogToLike=blogs.find(b => b.id===id)
      const LikedBlog={ ...blogToLike,likes:blogToLike.likes+1,user:blogToLike.user.id }
      await blogService.update(LikedBlog)
      setBlogs(blogs.map(b => b.id===id ? { ...blogToLike,likes:blogToLike.likes+1 } : b))
    }catch(exception){
      console.log(exception)
    }
  }

  const handleRemove=async (id) => {
    const blogToRemove=blogs.find(b => b.id===id)
    const ok=window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if(ok){
      await blogService.remove(id)
      setBlogs(blogs.filter(b => b.id!==id))
    }
  }

  const handleLogout=() => {
    window.localStorage.clear()
    setUser(null)
  }

  const blogFormRef=useRef()

  if(user===null){
    return (
      <div>
        <h2>Login to application</h2>

        <Notifications notification={notification} />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              name="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              id="password"
              type="password"
              name="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }
  else{
    const byLikes=(b1,b2) => b2.likes-b1.likes

    return (
      <div>
        <h2>Blogs</h2>

        <Notifications notification={notification} />
        <p>
          {user.name} logged-in <button id="logout" onClick={handleLogout}>logout</button>
        </p>

        <Togglable buttonLabel='create new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>

        {
          blogs.sort(byLikes).map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleRemove={handleRemove}
              own={user.username === blog.user.username }
            />
          )
        }
      </div>
    )
  }
}

export default App
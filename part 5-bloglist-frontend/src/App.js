import React, { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const Notifications=({message,color})=>{
    if(message==null)
    {
      return null
    }
    return (
      <div className="error" style={{color:color}}>
        {message}
      </div>
    )
}

const App = (props) => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [user,setUser]=useState(null)
  const [errorMessage,setErrorMessage]=useState(null)
  const [color,setColor]=useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>{
      blogs.sort((a,b)=>b.likes-a.likes)
      setBlogs( blogs )
    }
    )  
  }, [])

  useEffect(()=>{
    const loggedUserJSON=window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      const user=JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin=async (event)=>{

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
      setErrorMessage(`successfully logged in`)
      setColor('green')
      setTimeout(()=>{
        setErrorMessage(null)
        setColor(null)
      },5000)
    }catch(exception){
      console.log(exception)
      setErrorMessage(`wrong username or password`)
      setColor('red')
      setTimeout(()=>{
        setErrorMessage(null)
        setColor(null)
      },5000)
    }
  
  }

  const addBlog=async (newBlog)=>{
        try{
        blogFormRef.current.toggleVisibility()
        const returnedBlog=await blogService.create(newBlog)
            setBlogs(blogs.concat(returnedBlog))
            setErrorMessage(`a new blog ${returnedBlog.title} by ${user.name} added`)
              setColor('green')
            setTimeout(()=>{
              setErrorMessage(null)
              setColor(null)
            },5000)
        }catch(exception){
          console.log(exception)
          setErrorMessage(`you are missing something please ensure that you added title author`)
          setColor('red')
           setTimeout(()=>{
             setErrorMessage(null)
          setColor(null)
            },7000)
        }
  }

  const updateBlog=async (id,newBlog)=>{
    try{
      const updatedBlog=await blogService.update(id,newBlog)
      return updatedBlog
    }catch(exception){
      console.log(exception)
    }
  }

  const deleteBlog=async (id)=>{
      try{
        await blogService.delete(id)
      }catch(exception){
        console.log(exception)
      }
  }

  const loginForm=()=>(
  <form onSubmit={handleLogin}>
    <div>
      username
      <input 
      type="text"
      name="Username"
      value={username}
      onChange={({target})=>setUsername(target.value)}
      />
    </div>
    <div>
      password
      <input 
      type="password"
      name="Password"
      value={password}
      onChange={({target})=>setPassword(target.value)}
      />
    </div>
    <button type="submit">login</button>
  </form>
  )

  const logout=()=>{
    window.localStorage.clear()
    setUser(null)
  }

  const blogFormRef=useRef()

  const blogForm=()=>{
    return(
    <Togglable buttonLabel="create new blog" ref={blogFormRef}>
      <BlogForm 
      createBlog={addBlog}
      />
    </Togglable>
    )
  }

    if(user===null)
    {
      return (
        <div>
        <Notifications message={errorMessage} color={color}/>
        <h2>Log in to application</h2>
        {loginForm()}
        </div>
      )
    }
    else{
      return (
      <div>
        <h1>Blogs</h1>
        <div>
          <Notifications message={errorMessage} color={color}/>
            <b>{user.name} </b> logged-in
          <button onClick={logout}>logout</button>
        </div>
        <div>
          <h2>Create New</h2>
          {blogForm()}
          <h4>Blogs</h4>
          {
            blogs.map(blog =>
              <Blog key={blog.id} blog={blog} updateBlog={updateBlog} deleteBlog={deleteBlog}/>
              )
          }
        </div>
      </div>
      )
  }
}

export default App
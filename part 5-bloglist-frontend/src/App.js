import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
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
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')
  const [errorMessage,setErrorMessage]=useState(null)
  const [color,setColor]=useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const addBlog=async (event)=>{
        event.preventDefault()
        const newBlog={
          title,
          author,
          url,
        }
        try{
        const returnedBlog=await blogService.create(newBlog)
            setBlogs(blogs.concat(returnedBlog))
            setTitle('')
            setAuthor('')
            setUrl('')
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
  const blogForm=()=>{
    return (
      <div>
        <form onSubmit={addBlog}>
          <div>
          title: <input type="text" value={title} onChange={({target})=>{setTitle(target.value)}}/>
          </div>
          <div>
          author: <input type="text" value={author} onChange={({target})=>{setAuthor(target.value)}}/>
          </div>
          <div>
          url: <input type="text" value={url} onChange={({target})=>{setUrl(target.value)}}/>
          </div>
          <div>
          <button type="submit">create</button>
          </div>
        </form>
      </div>
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
              <Blog key={blog.id} blog={blog} />
              )
          }
        </div>
      </div>
      )
  }
}

export default App

import React, { useEffect,useRef, useState } from 'react'
import { Button,Nav,Navbar,Form,Table } from 'react-bootstrap'
import Notifications from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import userService from './services/users'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import { useDispatch,useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/loginReducer'
import Users from './components/Users'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
  useRouteMatch,
} from 'react-router-dom'
import axios from 'axios'

const App = () => {
  const user=useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON=window.localStorage.getItem('loggedBlogAppUser')
    if(loggedUserJSON){
      const user=JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  },[])

  //reference to toggle blog form after creating a blog
  const blogFormRef=useRef()

  const User = () => {
    const [user,setUser] = useState(null)
    const id=useParams().id
    useEffect(() => {
      const getUser=async () => {
        try{
          const user=await userService.getUser(id)
          setUser(user)
        }catch(e){
          console.log(e)
        }
      }
      getUser()
    },[])
    if(user)
    {
      return (
        <div>
          <h2>{user.name}</h2>
          <div>
            <h3>added blogs</h3>
            <ul>
              {
                user.blogs.map(blog => {
                  return (
                    <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
                  )
                })
              }
            </ul>
          </div>
        </div>
      )
    }
    return null
  }

  const padding = {
    padding:5
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user
                ? <Logout />
                : <Link style={padding} to="/login">login</Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Notifications  />
      <h2>Blog App</h2>
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/blogs/:id">
          <Blog />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <div>
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
              <BlogForm  blogFormRef={blogFormRef}/>
            </Togglable>
          </div>
          {user
            ?<BlogList />
            :<Login />
          }
        </Route>
      </Switch>
    </>
  )
}

export default App
import React, { useEffect,useRef } from 'react'
import { Button,Nav,Navbar,Form,Table } from 'react-bootstrap'
import Notifications from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import { useDispatch,useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { intializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/loginReducer'
import Users from './components/Users'
import User from './components/User'
import storage from './utils/storage'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'

const App = () => {
  const user=useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(intializeUsers())
    const user=storage.loadUser()
    if(user)
    {
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])


  //reference to toggle blog form after creating a blog
  const blogFormRef=useRef()

  const padding = {
    padding:5
  }

  return (
    <div className="container">
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
          {user
            ?<div>
              <Togglable buttonLabel='create new blog' ref={blogFormRef}>
                <BlogForm  blogFormRef={blogFormRef}/>
              </Togglable>
              <BlogList />
            </div>
            :<Login />
          }
        </Route>
      </Switch>
    </div>
  )
}

export default App
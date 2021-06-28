import React,{ useState,useEffect } from 'react'
import { Link,useParams } from 'react-router-dom'
import userService from '../services/users'

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

export default User
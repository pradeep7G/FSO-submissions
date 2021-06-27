/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import userService from '../services/users'

const Dispaly =({users}) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th colSpan="1">blogs created</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => {
              return (
              <tr key={user.id}>
                  <td> <Link to={`/users/${user.id}`}>{user.name}</Link></td>
                  <td>{user.blogs.length}</td>
              </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

const Users = () => {
  const [users,setUsers]=useState([])
  useEffect(async ()=>{
    const response=await userService.getAll()
    setUsers(response)
  },[])
  return (
    <div>
      <h2>Users</h2>
      <Dispaly users={users}/>
    </div>
  )
}
export default Users
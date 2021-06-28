import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'

const Dispaly =({ users }) => {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>user</th>
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
      </Table>
    </div>
  )
}

const Users = () => {
  const users = useSelector(state => state.users)
  return (
    <div>
      <h4>Users</h4>
      <Dispaly users={users}/>
    </div>
  )
}
export default Users
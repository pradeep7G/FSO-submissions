/* eslint-disable */

import React, { useState } from 'react'
import {userLogin} from '../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
const Login = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin=async (event) => {
    event.preventDefault()
    const username=event.target.username.value 
    const password=event.target.password.value 
    dispatch(userLogin(username,password))
    history.push('/')
  }

  return (
  <div>
    <h3>Login to application</h3>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          name="username"
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          name="password"
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
</div>
  )
}

export default Login
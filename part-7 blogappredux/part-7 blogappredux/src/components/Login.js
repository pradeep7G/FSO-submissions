
import React, { useState } from 'react'
import { Form,Button } from 'react-bootstrap'
import { userLogin } from '../reducers/loginReducer'
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
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            id="username"
            type="text"
            name="username"
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            name="password"
          />
        </Form.Group>
        <Button id="login-button" variant="primary" type="submit">login</Button>
      </Form>
    </div>
  )
}

export default Login
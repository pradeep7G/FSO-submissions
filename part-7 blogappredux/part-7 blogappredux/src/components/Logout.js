import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'
import { Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const Logout = () => {
  const dispatch = useDispatch()
  const history=useHistory()
  const user=useSelector(state => state.user)
  const handleLogout=() => {
    dispatch(userLogout())
    history.push('/')
  }
  return (
    <p>
      {user.name} logged-in <Button id="logout" variant="primary" onClick={handleLogout}>logout</Button>
    </p>
  )
}

export default Logout
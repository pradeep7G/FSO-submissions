import React from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { userLogout } from '../reducers/loginReducer'
import { Button } from 'react-bootstrap'

const Logout = () => {
  const dispatch = useDispatch()
  const user=useSelector(state => state.user)
  const handleLogout=() => {
    dispatch(userLogout())
  }
  return (
    <p>
      {user.name} logged-in <Button id="logout" variant="primary" onClick={handleLogout}>logout</Button>
    </p>
  )
}

export default Logout
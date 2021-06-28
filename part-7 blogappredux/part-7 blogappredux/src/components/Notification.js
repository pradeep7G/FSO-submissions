import React from 'react'
import { useSelector } from 'react-redux'

const Notifications=() => {
  const notification=useSelector(state => state.notification)
  const style={
    borderStyle:'solid',
    borderRadius:5,
    padding:10,
    color:notification.type==='success'?'green':'red',
    background:'lightgrey'
  }
  if(notification.message)
  {
    return (
      <div style={style}>
        {notification.message}
      </div>
    )
  }
  return null
}

export default Notifications
import React from 'react'
import {useDispatch} from 'react-redux'
import {AddNewAnecdote} from '../reducers/anecdoteReducer'
import { resetMessage, setMessage } from '../reducers/notificationReducer'

const AnecdoteForm=()=>{

  const dispatch=useDispatch()

  const addAnecdote=(event)=>{
    event.preventDefault()
    const content=event.target.anecdote.value 
    event.target.anecdote.value=''
    dispatch(AddNewAnecdote(content))
    dispatch(setMessage(`you created an anecdote ${content}`))
    setTimeout(()=>{
      dispatch(resetMessage())
    },5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
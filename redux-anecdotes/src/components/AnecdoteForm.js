import React from 'react'
import {connect} from 'react-redux'
import {AddNewAnecdote} from '../reducers/anecdoteReducer'
import {setMessage } from '../reducers/notificationReducer'


const AnecdoteForm=(props)=>{

  const addAnecdote=async (event)=>{
    event.preventDefault()
    const content=event.target.anecdote.value 
    event.target.anecdote.value=''
    props.AddNewAnecdote(content)
    props.setMessage(`you created an anecdote '${content}'`,5)
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

const mapDispatchToProps= {
  AddNewAnecdote,
  setMessage
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
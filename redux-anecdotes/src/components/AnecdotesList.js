import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Vote} from '../reducers/anecdoteReducer'
import { resetMessage, setMessage } from '../reducers/notificationReducer'

const Anecdote=({anecdote,handleClick})=>{
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdotesList=()=>{

  const dispatch=useDispatch()
  const anecdotes=useSelector(state => state.anecdotes)
  const filter=useSelector(state => state.filter)
  const byVotes=(a,b)=>b.votes-a.votes

  const handleClick=async (anecdote)=>{
    dispatch(Vote(anecdote))
    dispatch(setMessage(`you voted '${anecdote.content}'`,5))
  }

return (
  <div>
    {anecdotes.filter(anecdote => {
      return anecdote.content.toUpperCase().search(filter.toUpperCase())!==-1
    }).sort(byVotes).map(anecdote =>
      <Anecdote 
      key={anecdote.id}
      anecdote={anecdote}
      handleClick={()=>handleClick(anecdote)}
      />
    )}
    </div>
  )
}

export default AnecdotesList
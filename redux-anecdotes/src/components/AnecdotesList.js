import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Vote} from '../reducers/anecdoteReducer'

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
  const anecdotes=useSelector(state => state)
  const byVotes=(a,b)=>b.votes-a.votes
return (
  <div>
    {anecdotes.sort(byVotes).map(anecdote =>
      <Anecdote 
      key={anecdote.id}
      anecdote={anecdote}
      handleClick={()=>dispatch(Vote(anecdote.id))}
      />
    )}
    </div>
  )
}

export default AnecdotesList
import React from 'react'
import {connect} from 'react-redux'
import {Vote} from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'

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

const AnecdotesList=(props)=>{

  const byVotes=(a,b)=>b.votes-a.votes
  const handleClick=async (anecdote)=>{
    props.Vote(anecdote)
    props.setMessage(`you voted '${anecdote.content}'`,5)
  }

return (
  <div>
    {props.anecdotes.sort(byVotes).map(anecdote =>
      <Anecdote 
      key={anecdote.id}
      anecdote={anecdote}
      handleClick={()=>handleClick(anecdote)}
      />
    )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    anecdotes:state.anecdotes.filter(anecdote => 
      anecdote.content.toUpperCase().search(state.filter.toUpperCase())!==-1
      )
  }
}

const mapDispatchToProps = {
  Vote,
  setMessage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdotesList)
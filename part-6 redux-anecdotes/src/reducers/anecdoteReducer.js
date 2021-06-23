import anecdoteService from '../services/notes'

const reducer = (state = [], action) => {

  switch(action.type) {
    case 'NEW_ANECDOTE':{
      return state.concat(action.data)
    }
    case 'INIT_ANECDOTES':{
      return action.data
    }
    case 'VOTE_ANECDOTE':{
      const id=action.data.id 
      return state.map(an => 
        an.id!==id ? an : action.data
        )
    }
    default:
      return state

  }

}

export const AddNewAnecdote=(content)=>{
  return async dispatch =>{
    const anecdote = await anecdoteService.create(content)
    dispatch({
      type:'NEW_ANECDOTE',
      data:anecdote,
    })
  }
}

export const Vote=(anecdote)=>{
  return async dispatch =>{
    const updatedAnecdote={...anecdote,votes:anecdote.votes+1}
    const receivedAnecdote=await anecdoteService.update(updatedAnecdote)
    dispatch({
      type:'VOTE_ANECDOTE',
      data:receivedAnecdote
    })
    }
}
 

export const initializeAnecdotes=()=>{
  return async dispatch =>{
    const anecdotes=await anecdoteService.getAll()
    dispatch({
      type:'INIT_ANECDOTES',
      data:anecdotes
    })
  }
}

export default reducer
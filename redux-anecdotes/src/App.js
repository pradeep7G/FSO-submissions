import React,{useEffect} from 'react'
import AnecdotesList from './components/AnecdotesList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import anecdoteService from './services/notes'
import {useDispatch} from 'react-redux'
import { initializeAnecdotes } from './reducers/anecdoteReducer';
const App = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
      dispatch(initializeAnecdotes())
  },[dispatch])

  return (
     <div>
       <Notification />
       <h2>Anecdotes</h2>
       <Filter />
       <AnecdotesList />
       <AnecdoteForm />
     </div>
  )
}

export default App
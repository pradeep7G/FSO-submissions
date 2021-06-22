import React from 'react'
import AnecdotesList from './components/AnecdotesList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {

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
import React from 'react'
import AnecdotesList from './components/AnecdotesList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {

  return (
     <div>
       <h2>Anecdotes</h2>
       <AnecdotesList />
       <AnecdoteForm />
     </div>
  )
}

export default App
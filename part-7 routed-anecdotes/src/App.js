import React, { useState } from 'react'
import {useField} from './hooks'

import {
  Switch,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
  useRouteMatch,
} from 'react-router-dom'

const Anecdote=({anecdote})=>{
  return (
    <div>
      <h2>{anecdote.content} by {anecdote.author}</h2> <br/>
      has {anecdote.votes} votes <br/>
      for more info see {anecdote.url}
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
      <li key={anecdote.id}>
        <Link to={`/anecdotes/${Number(anecdote.id)}`}>{anecdote.content}</Link>
      </li>)}
    </ul>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {

  const {reset:contentReset,...content}=useField('text')
  const {reset:authorReset,...author}=useField('text')
  const {reset:infoReset,...info}=useField('text')

  const history=useHistory()
  const handleSubmit = (e) => {
    e.preventDefault()
    history.push('/anecdotes')
    props.addNew(
      {
        content:content.value,
        author:author.value,
        info:info.value,
        votes:0
      }
    )
  }

  const handleReset=() => {
    contentReset()
    authorReset()
    infoReset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content} />
        </div>
        <div>
          author
          <input name='author' {...author} />
        </div>
        <div>
          url for more info
          <input name='info' {...info} />
        </div>
        <button>create</button>
        <button type="reset" onClick={()=>handleReset()}>reset</button>
      </form>
    </div>
  )
}

const Login=(props)=>{
  const history=useHistory()

  const onSubmit= (event) => {
    event.preventDefault()
    props.onLogin('pradeep')
    history.push('/')
  }
  return (
    <form onSubmit={onSubmit}>
      user name <input type="text"/>
      password <input type="password"/>
      <button>submit</button>
    </form>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')
  const [user,setUser]=useState(null)

  const login = (user) => {
    setUser(user)
  }

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

   const padding = {
    paddingRight: 5
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match
    ? anecdotes.find(anec => Number(anec.id) === Number(match.params.id))
    : null
  return (
    <div>
        <div>
          <h1>Software anecdotes</h1>
          <Link style={padding} to="/anecdotes">anecdotes</Link>
          <Link style={padding} to="/create">create new</Link>
          <Link style={padding} to="/about">about</Link>
          {
           user
            ? <em>{user} logged in</em>
            : <Link style={padding} to="/login">login</Link>
          }
        </div>
        
        <Switch>
          <Route path="/anecdotes/:id">
            <Anecdote anecdote = {anecdote}/>
          </Route>
          <Route path="/create">
            <CreateNew addNew={addNew} />
          </Route>
          <Route path="/about">
              <About />
          </Route>
           <Route path="/anecdotes">
            <AnecdoteList anecdotes = {anecdotes}/>
          </Route>
          <Route path="/login">
            <Login onLogin={login}/>
          </Route>
          <Route path="/">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
        </Switch>
      <Footer />
    </div>
  )
}
export default App 
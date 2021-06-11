import React, { useState } from 'react'

const Button=({handleClick,text})=>{
  return (
  <button onClick={handleClick}>{text}</button>
  )
}

const DisplayAnecdote=({anecdote,vote})=>{

  return (
    <div>
      {anecdote} <br/>
      has {vote} votes <br/>
    </div>
   )
}

const App = () => {

  const [selected, setSelected] = useState(0);
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
  const obj={};
  for(let i=0;i<anecdotes.length;i++)
  {
    obj[i]=0;
  }
  const [votes, setVotes] = useState(obj);
  
  const selectRandom=()=>{
     const num=Math.random()*(anecdotes.length);
     setSelected(Math.floor(num));
  }
  let Max=0,key=0;
  const vote=()=>{
    const newObj={...votes};
    newObj[selected]+=1;
    setVotes(newObj);
  }
  
   for(let j=0;j<anecdotes.length;j++)
    {
      if(Max < votes[j])
      {
        Max=votes[j];
        key=j;
      }
    }

  return (
    <>
    <div>
      <h1>Anecdote of the day</h1>
      <DisplayAnecdote anecdote={anecdotes[selected]} vote={votes[selected]} />
      <Button handleClick={vote} text='vote' />
      <Button handleClick={selectRandom} text='next anecdote' />
      </div>
      <div>
      <h1>Anecdote with most votes</h1>
      <DisplayAnecdote anecdote={anecdotes[key]} vote={Max} />
    </div>
    </>
  )
}

export default App
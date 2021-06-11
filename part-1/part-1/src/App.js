
import React,{useState} from 'react';
const Statistics=({good,neutral,bad})=>{
  return (
    <div>
      <h2>statistics</h2>
      good {good} <br/>
      neutral {neutral} <br/>
      bad {bad} <br/>
      all {good + neutral + bad} <br/>
      average {(good - bad)/(good + neutral + bad)} <br/>
      positive {(good)*100/(good + neutral + bad)} %<br/>
    </div>
  )
}

const Button=({handleClick,text})=>{
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
const App=()=>{
  //save clicks to each button to its own state
  const [good,setGood]=useState(0);
  const [neutral,setNeutral]=useState(0);
  const [bad,setBad]=useState(0);

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={()=>setGood(good+1)} text='good' />
      <Button handleClick={()=>setNeutral(neutral+1)} text='neutral' />
      <Button handleClick={()=>setBad(bad+1)} text='bad' />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App;
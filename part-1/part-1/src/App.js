
import React,{useState} from 'react';

const Statistic=({text,value})=>{
  return (
    <>
     <td>{text}</td>
     <td>{value}</td>
    </>
  )
}
const Statistics=({good,neutral,bad})=>{

  const average=(good - bad)/(good + neutral + bad);
  const total=(good + bad + neutral);
  const positive = (good)*100/(good + neutral + bad);
  if((good + bad + neutral)===0)
  {
    return (
    <>
      <div>
        No Feedback given
      </div>
      </>
    )
  }
  return (
    
    <table>
      <tbody>
      <tr>
      <Statistic text='good' value={good} />
      </tr>
      <tr>
      <Statistic text='neutral' value={neutral} />
      </tr>
      <tr>
      <Statistic text='bad' value={bad} />
      </tr>
      <tr>
      <Statistic text='all' value={total} />
      </tr>
      <tr>
      <Statistic text='average' value={average} />
      </tr>
      <tr>
      <Statistic text='positive' value={positive} />
      </tr>
      </tbody>
    </table>
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
      <h1>give feedback</h1>
      <Button handleClick={()=>setGood(good+1)} text='good' />
      <Button handleClick={()=>setNeutral(neutral+1)} text='neutral' />
      <Button handleClick={()=>setBad(bad+1)} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App;
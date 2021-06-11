import React from 'react';

const Header=(props)=>{
  return (
   <div>
     <h1>{props.course}</h1>
   </div>
  )
}

const Part=({part})=>{
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}
const Content=({parts})=>{
  return (
  <div>
    {parts.map((part)=><Part key={part.id} part={part}/>)}
  </div>
  )
}
const Total=({parts})=>{
  return (
    <>
      <p><b>Total of {parts.reduce((acc,cur)=> acc + cur.exercises,0)} exercises </b></p>
    </>
  )
}

const Course=({course})=>{

      return (
        <div>
        <Header course={course.name} />
        <Content parts={course.parts}  />
        <Total parts={course.parts}/>
        </div>
      )
}

const App = () => {
 const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App;
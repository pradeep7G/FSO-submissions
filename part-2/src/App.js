import React from 'react';

const Header=(props)=>{
  return (
   <div>
     <h2>{props.course}</h2>
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

  const total=parts.reduce((acc,cur)=> acc + cur.exercises,0);
  return (
    <>
      <p><b>Total of {total} exercises</b></p>
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

  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
  <div>
    <h1>Web development Curriculam</h1>
  {courses.map((course)=><Course key={course.id} course={course}/>)}
  </div>
  )
}

export default App;
import React from 'react'

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

export default Course;
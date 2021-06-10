
import React,{useState} from 'react';

// const Header=(props)=>{
//   return (
//    <div>
//      <h1>{props.course}</h1>
//    </div>
//   )
// }

// const Part=(props)=>{
//   return (
//     <p>
//       {props.part} {props.exercises}
//     </p>
//   )
// }
// const Content=(props)=>{
//   return (
//   <div>
//     <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
//     <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
//     <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
//   </div>
//   )
// }

// const Total=(props)=>{
//   return (
//     <>
//       <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}</p>
//     </>
//   )
// }

// const App = () => {
//   const course ={
//   name : 'Full Stack application development',
//   parts : [
//   {
//     name: 'Fundamentals of React',
//     exercises: 10
//   },
//   {
//     name: 'Using props to pass data',
//     exercises: 7
//   },
//   {
//     name: 'State of a component',
//     exercises: 14
//   }
// ]
//   }
//   return (
//     <div>
//      <Header course={course.name} />
//      <Content parts={course.parts}  />
//      <Total parts={course.parts}  />
//     </div>
//   )
// }

// const Display=({counter})=>{
//   return (
//     <div>
//       {counter}
//     </div>
//   )
// }

// const Button=({handleClick,text})=>{
//   return (
//    <button onClick={handleClick}>
//      {text}
//    </button>
//   )
// }

// const App=(props)=>{
//   const [counter,setCounter]=useState(0);
//   const increaseByOne=()=>setCounter(counter+1);
//   const decreaseByOne=()=>setCounter(counter-1);
//   const setToZero=()=>setCounter(0);
//   return (
//     <div>
//       <Display counter={counter} />
//       <Button handleClick={increaseByOne} text='plus' />
//       <Button handleClick={decreaseByOne} text='minus' />
//       <Button handleClick={setToZero} text='zero' />
//     </div>
//   )
// }
const History=(props)=>{
  if(props.allClicks.length === 0)
  {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press History : {props.allClicks.join(' ')}
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
  const [left,setLeft]=useState(0);
  const [right,setRight]=useState(0);
  const [allClicks,setAll]=useState([]);
  // const [clicks,setClicks]=useState({
  //   left:0,
  //   right:0
  // });
  // const handleLeftClick=()=>{
  //   // const newClick={
  //   //  ...clicks,
  //   //  left:clicks.left+1
  //   // }
  //   setClicks({...clicks,left:clicks.left+1});
  // }

  // const handleRightClick=()=>{
  //   // const newClick={
  //   //   ...clicks,
  //   //   right:clicks.right+1
  //   // }
  //   setClicks({...clicks,right:clicks.right+1});
  // }
  const handleLeftClick=()=>{
    setAll(allClicks.concat('L'));
    setLeft(left+1);
  }
  const handleRightClick=()=>{
    setAll(allClicks.concat('R'));
    setRight(right+1);
  }
  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />
      <Button handleClick={handleRightClick} text='right' />
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}

export default App;
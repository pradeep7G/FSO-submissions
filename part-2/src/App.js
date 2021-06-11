import React,{useState} from 'react';

const App=()=>{
  const [person,setPerson]=useState([
    {name:'Pradeep P'},
  ])
  
  const [newName,setNewName]=useState('');

  const addName=(event)=>{
    event.preventDefault();
    const newObj={name:newName};
    // console.log(newObj);
    setPerson(person.concat(newObj));
    setNewName('');
  }

  const handleOnChange=(event)=>{
      const newPerson=event.target.value;
      setNewName(newPerson);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name:<input value={newName} onChange={handleOnChange}/>
        </div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
      {person.map((personn)=><div key={personn.name}>{personn.name}</div>)}
      </div>
    </div>
  )
}

export default App;
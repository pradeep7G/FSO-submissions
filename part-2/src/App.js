import React,{useState} from 'react';

const App=()=>{
  const [person,setPerson]=useState([
    {name:'Pradeep P',number:"7989266"},
  ])
  
  const [newName,setNewName]=useState('');
  const [newNumber,setNewNumber]=useState('');

  const addPerson=(event)=>{
    event.preventDefault();
    const newObj={name:newName,number:newNumber};
     let found=person.find(element => element.name === newName);
       if(found && found.name===newName)
       {
          alert(`${newName} is already added to phonebook`)
       }
       else
       {
          found=person.find(element => element.number === newNumber);
          if(found && found.number===newNumber)
          {
              alert(`${newNumber} is already added to phonebook`)
          }
          else
          {
              setPerson(person.concat(newObj));
              setNewName('');
              setNewNumber('');
          }
      }
  }

  const handleOnChange=(event)=>{
      const newPerson=event.target.value;
      setNewName(newPerson);
  }

  const handleNumberInfo=(event)=>{
    const newPNumber=event.target.value;
      setNewNumber(newPNumber);
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:<input value={newName} onChange={handleOnChange}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberInfo}/></div>
        <div>
          <button type="submit">
            add
          </button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
      {person.map((personn)=><div key={personn.name}>{personn.name} - {personn.number}</div>)}
      </div>
    </div>
  )
}

export default App;
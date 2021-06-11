import React,{useState} from 'react';

const DisplayPerson=({name,number})=>{
  return (
     <div>{name}  {number}</div>
  )
}

const Search=({search,person})=>{
  let ar=[];
  person.forEach((p)=>{
    if(p.name.toUpperCase().search(search.toUpperCase())!==-1)
    {
      ar.push(p);
    }
  })
  console.log(ar);
  return (
    <div>
    {
      ar.map((p)=>{
        return (
        <div key={p.name}>{p.name} {p.number}</div>
        )
      })
    }
    </div>
  )
}

const App=()=>{
  const [person,setPerson]=useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  
  const [newName,setNewName]=useState('');
  const [newNumber,setNewNumber]=useState('');
  const [search,setSearch]=useState('');

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

  const handleSearch=(event)=>{
    const newSearch=event.target.value;
    setSearch(newSearch);
  }
  
  return (
    <div>
      <h1>Phonebook</h1>
        <div>filter shown with : <input value={search} onChange={handleSearch} /></div>
        <Search search={search} person={person} />
      <h2>Add a new </h2>
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
      {person.map((personn)=> <DisplayPerson key={personn.name} name={personn.name} number={personn.number} />)}
      </div>
    </div>
  )
}

export default App;
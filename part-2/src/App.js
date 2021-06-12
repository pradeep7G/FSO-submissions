import React,{useState,useEffect} from 'react';
import axios from 'axios';
const DisplayPerson=({person})=>{
  return (
     <div>{person.id} {person.name}  {person.number}</div>
  )
}

const Filter=({search,handleSearch,person})=>{
  return (
    <>
    <div><strong>filter shown with : </strong> <input value={search} onChange={handleSearch} /></div>
    <Search search={search} person={person} />
   </>
  )
}

const PersonForm=({addPerson,handleOnChange,newNumber,handleNumberInfo,newName})=>{
  return (
   <form onSubmit={addPerson}>
        <div>name:<input value={newName} onChange={handleOnChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberInfo}/></div>
        <div><button type="submit">add</button></div>
   </form>
  )
}

const Persons=({person})=>{
    return (
      <div>
        {person.map((personn)=> <DisplayPerson key={personn.id} person={personn} />)}
      </div>
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

  return (
    <div>
    {ar.map((p)=> <DisplayPerson key={p.id} person={p} /> )}
    </div>
  )
}

const App=()=>{
  const [person,setPerson]=useState([]);
  const [newName,setNewName]=useState('');
  const [newNumber,setNewNumber]=useState('');
  const [search,setSearch]=useState('');

  useEffect(()=>{
    // console.log('effect');  
    axios.get('http://localhost:3001/persons').then((response)=>{
      // console.log(response);
      setPerson(response.data);
    })
  },[]);

  const addPerson=(event)=>{
    event.preventDefault();
    const newObj={name:newName,number:newNumber,id:person.length+1};
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
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} person={person} />
      <h3>Add a new </h3>
      <PersonForm 
      addPerson={addPerson}
      handleOnChange={handleOnChange}
      newNumber={newNumber}
      handleNumberInfo={handleNumberInfo}
      newName={newName}
      />

      <h2>Numbers</h2>
      <Persons person={person} />
    </div>
  )
}

export default App;
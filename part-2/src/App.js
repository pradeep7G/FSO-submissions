import React,{useState,useEffect} from 'react';
import phonebook from './services/crud';
import Show from './components/Show'

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

const Persons=({person,handleDelete})=>{
    return (
      <div>
        {person.map((personn)=> <Show key={personn.id} P={personn} handleDelete={()=>handleDelete(personn.id)} />)}
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
    {ar.map((p)=> <Show key={p.id} P={p} /> )}
    </div>
  )
}

const App=()=>{
  const [person,setPerson]=useState([]);
  const [newName,setNewName]=useState('');
  const [newNumber,setNewNumber]=useState('');
  const [search,setSearch]=useState('');

  useEffect(()=>{
    phonebook.getAll().then(initialNumbers=>
      setPerson(initialNumbers)
      )
  },[]);

  const addPerson=(event)=>{
    event.preventDefault();
    const newObj={name:newName,number:newNumber};
     let found=person.find(element => element.name === newName);
       if(found && found.name===newName)
       {
          // alert(`${newName} is already added to phonebook`)
          if(window.confirm(`${newName} is already added to phonebook,replace the old number with new one?`))
          {
            phonebook.update(found.id,newObj)
            .then(returnedPerson=>{
              setPerson(person.map((p)=>{
                return p.id!==found.id ? p : returnedPerson;
              }))
            })
          }
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
              phonebook.create(newObj)
              .then(returnedPerson=>
                setPerson(person.concat(returnedPerson))
                )
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
  
  const handleDelete=(id)=>{
    let newPersons=[];
    const personn=person.find(p=>p.id===id);
    if(window.confirm(`Delete ${personn.name}`))
    {
      phonebook.destroy(id).then(()=>{
        person.forEach((p)=>{
          if(p.id!==id)
          newPersons.push(p);
        })
        setPerson(newPersons);
      })
    }
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
      <Persons person={person} handleDelete={handleDelete}/>
    </div>
  )
}

export default App;
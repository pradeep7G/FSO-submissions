import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Showcountry from './components/Showcountry';

const Filter=({search,countries,handleToggle})=>{
  let ar=[];
  countries.forEach((country)=>{
    const isPresent=country.name.toUpperCase().search(search.toUpperCase());
    if(isPresent!==-1)
    {
      ar.push(country);
    }
  })
  if(search==='')
  {
    return (
    <div>Enter country name to get details..</div>
    )
  }
  else if(ar.length===1)
  {
    return (
      <Showcountry key={ar[0].alpha3Code} country={ar[0]} />
    )
  }
  else if (ar.length > 10)
  {
    return (
        <div>Too many matches,specify another filter or enter complete name</div>
    )
  }
  return (
    <div>
    {
      ar.map((country)=>{
      return (
      <div key={country.name}>{country.name} <button key={country.name} name={country.name} onClick={handleToggle}>show</button></div>
      )

    })
    }
    </div>
  )
}

const App=()=>{

  const [countries,setCountries]=useState([]);
  const [searchInp,setSearch]=useState('');

  const handleOnSubmit=(event)=>{
    event.preventDefault();
    setSearch('');
  }
  
  const handleOnChange=(event)=>{
    const newSearch=event.target.value;
    setSearch(newSearch);
  }
  
  const handleToggle=(event)=>{
    let toggle=false;
    toggle=!toggle;
    if(toggle)
    {
      const newSearch=event.target.name;
      setSearch(newSearch);
    }
  }
  
  useEffect(()=>{
  axios.get('https://restcountries.eu/rest/v2/all').then((res)=>{
    setCountries(res.data);
  })
  },[]);
  
  return (
    <div>
      <h1>App component</h1>
      <form onSubmit={handleOnSubmit}>
        <input value={searchInp} onChange={handleOnChange} />
      </form>
        <Filter search={searchInp} handleToggle={handleToggle} countries={countries}/>
    </div>
  )
}

export default App;
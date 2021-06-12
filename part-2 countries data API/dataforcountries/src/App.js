import React,{useState,useEffect} from 'react';
import axios from 'axios';



const Filter=({search,countries})=>{
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
      <div>
            <h1>{ar[0].name}</h1>
            <div>
            {ar[0].capital} <br/>
            {ar[0].population}
            </div>
            <div>
              <h2>languages</h2>
              <ul>
                {ar[0].languages.map((lang)=>{
                  return (
                  <li key={lang.iso639_1}>{lang.name}</li>
                  )
                })}
              </ul>
            </div>
            <div>
             <img src={ar[0].flag} alt={`flag of ${ar[0].name}`} width={125}/>
            </div>
      </div>
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
      ar.map((country)=><div key={country.alpha3Code}>{country.name}</div>)
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
  
  useEffect(()=>{
  axios.get('https://restcountries.eu/rest/v2/all').then((res)=>{
    setCountries(res.data);
  })
  },[]);
  // console.log(countries[0]);
  return (
    <div>
      <h1>App component</h1>
      <form onSubmit={handleOnSubmit}>
        <input value={searchInp} onChange={handleOnChange} />
      </form>
        <Filter search={searchInp} countries={countries}/>
    </div>
  )
}

export default App;
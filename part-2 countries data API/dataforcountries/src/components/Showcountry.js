import React from 'react';
const Showcountry=({country})=>{
    return (
      <div>
            <h1>{country.name}</h1>
            <div>
            {country.capital} <br/>
            {country.population}
            </div>
            <div>
              <h2>languages</h2>
              <ul>
                {country.languages.map((lang)=>{
                  return (
                  <li key={lang.iso639_1}>{lang.name}</li>
                  )
                })}
              </ul>
            </div>
            <div>
             <img src={country.flag} alt={`flag of ${country.name}`} width={125}/>
            </div>
      </div>
    )
}

export default Showcountry;
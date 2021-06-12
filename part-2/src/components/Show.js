import React from 'react';
const Show=({P,handleDelete})=>{
    return(
    <div>
        <div>{P.name}  {P.number} </div> 
        <button onClick={handleDelete}>delete</button>
    </div>
    )
}
export default Show;
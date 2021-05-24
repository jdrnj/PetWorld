import React, {useState} from 'react'
import './cats.css'

function PetList({name, breed, age, sex}) {

    return (
        <div className="cat">
         <h3>{name}</h3>
         <h3>{breed}</h3>
         <h3>{age}</h3>
         <h3>{sex}</h3>
        </div>
    )
}

export default PetList
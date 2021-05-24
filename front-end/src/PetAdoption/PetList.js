import React from 'react'
import './Pet.css'
import test from '../images/testanimalscard.jpg'
function PetList({ name, breed, age, sex }) {

    return (
        <div className='pet'>
            <div class="pet-image"><img src={test} alt='' /></div>
            <div className='pet-card-content'>
                <h3 className='pet-name'>{name}</h3>
                <p className='pet-details'>{breed}</p>
                <p className='pet-details'>{age}</p>
                <p className='pet-details'>{sex}</p>
                <button class="btn card_btn">Read More</button>

            </div>
        </div>
    )
}

export default PetList
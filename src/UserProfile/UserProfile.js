import React from 'react'
import {Link} from 'react-router-dom'

function UserProfile() {

    const petsHandler = e => {
        e.preventDefault()
    }

    return (
        <div className="user-profile">
            <form onSubmit={petsHandler}>
                <label htmlFor="" className="adopt-cat-label">Adopt a cat</label>
                <img src="img/cat1.jpg" alt="cat" className="cat-img"/>
                <Link to="/cats">
                <button className="cat-btn">View Available Cats</button>
                </Link>
                <label htmlFor="" className="adopt-dog-label">Adopt a dog</label>
                <img src="img/dog1.jpg" alt="cat" className="cat-img"/>
                <Link to='/dogs'>
                <button className="dog-btn">View Available Dogs</button>
                </Link>
                <label htmlFor="" className="adopt-cat-label">Adopt a rabbit</label>
                <img src="img/cat1.jpg" alt="cat" className="cat-img"/>
                <Link to="/rabbits">
                <button className="cat-btn">View Available Rabbits</button>
                </Link>
            </form>
        </div>
    )
}

export default UserProfile
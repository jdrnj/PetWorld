import React, { useState } from "react";
import PetList from "./PetList";
import './AnimalList.css'
import Account from "../Components/Account/Account";

function AnimalList({ match }) {

  const [cats, setCats] = useState([
    {
      name: "Mandy",
      id: 123,
      breed: "British shorthair",
      age: "Young",
      sex: "Female",
    },
    {
      name: "Tomy",
      id: 324,
      breed: "Domestic shorthair",
      age: "Senior",
      sex: "Male",
    },
    {
      name: "Ana Maria",
      id: 6534,
      breed: "Domestic shorthair",
      age: "Adult",
      sex: "Female",
    },
  ]);
  const [dogs, setDogs] = useState([
    {
      name: "dog1",
      id: 123,
      breed: "British shorthair",
      age: "Young",
      sex: "Female",
    },
    {
      name: "dog2",
      id: 324,
      breed: "Domestic shorthair",
      age: "Senior",
      sex: "Male",
    },
    {
      name: "dog3",
      id: 6534,
      breed: "Domestic shorthair",
      age: "Adult",
      sex: "Female",
    },
  ]);
  const [rabbits, setRabbits] = useState([
    {
      name: "rabbit1",
      id: 123,
      breed: "British shorthair",
      age: "Young",
      sex: "Female",
    },
    {
      name: "rabbit2",
      id: 324,
      breed: "Domestic shorthair",
      age: "Senior",
      sex: "Male",
    },
    {
      name: "rabbit3",
      id: 6534,
      breed: "Domestic shorthair",
      age: "Adult",
      sex: "Female",
    },
  ]);

  const renderSwitch = (type) => {
    switch (type) {
      case "cats":
        return cats.map((cat) => (
          <PetList
            name={cat.name}
            key={cat.id}
            breed={cat.breed}
            age={cat.age}
            sex={cat.sex}
          />
        ));
      case "dogs":
        return dogs.map((dog) => (
          <PetList
            name={dog.name}
            key={dog.id}
            breed={dog.breed}
            age={dog.age}
            sex={dog.sex}
          />
        ));
      case "rabbits":
        return rabbits.map((rabbit) => (
          <PetList
            name={rabbit.name}
            key={rabbit.id}
            breed={rabbit.breed}
            age={rabbit.age}
            sex={rabbit.sex}
          />
        ));
      case "account":
        return <Account />;
      case 'all':
        const all = [...cats, ...dogs, ...rabbits]
        return (
          <ul className='cards'>
            {
              all.map((pet) => (
                <li className='card-item'>
                  <PetList
                    name={pet.name}
                    key={pet.id}
                    breed={pet.breed}
                    age={pet.age}
                    sex={pet.sex}
                  />
                </li>

              ))
            }

          </ul>

        )
      default:
        return <h1>error</h1>;
    }
  };
  return (

    <div className="pet-list">
      {/* <button className="add-pet">Add Pet</button> */}
      {
        match ?
          renderSwitch(match.params.animal)
          :
          renderSwitch('all')
      }

    </div>
  );
}

export default AnimalList;

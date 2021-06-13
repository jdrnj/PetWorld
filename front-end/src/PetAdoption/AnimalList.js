import React, { useState, useEffect } from "react";
import PetCard from "./PetCard";
import "./AnimalList.css";
import axios from "axios";
import moment from "moment";
function AnimalList({ match, allAnimals }) {
  const [animals, setAnimals] = useState([]);
  useEffect(() => {
    if (match) {
      axios
        .get("http://localhost:3001/pet/get/by/category", {
          params: {
            name: match.params.category,
            date: moment().subtract(5, 'days').format('L')
          },
        })
        .then((res) => setAnimals(res.data.data.animals));
    }
  }, [match]);

  return (
    <div className="pet-list">
      <ul className="cards">
        {match?.params?.category
          ? animals?.map((pet) => (
            <li className="card-item" key={pet.animal_id}>
              <PetCard
                id={pet.animal_id}
                name={pet.animal_name}
                key={pet.id}
                breed={pet.breed}
                age={pet.age}
                sex={pet.sex}
                category={pet.category_name + "s"}
                image={`http://localhost:3001/images/${pet.image}`}
                isAdopted={pet.isAdopted}
              />
            </li>
          ))
          : allAnimals?.map((pet) => (
            <li className="card-item" key={pet.animal_id}>
              <PetCard
                id={pet.animal_id}
                name={pet.animal_name}
                key={pet.id}
                breed={pet.breed}
                age={pet.age}
                sex={pet.sex}
                category={pet.category_name + "s"}
                image={`http://localhost:3001/images/${pet.image}`}
                isAdopted={pet.isAdopted}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default AnimalList;

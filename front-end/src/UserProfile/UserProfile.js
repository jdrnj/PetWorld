import React, { useState, useEffect } from "react";
import axios from "axios";
import PetCard from "../PetAdoption/PetCard";

function UserProfile() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/categories/get")
      .then((res) => setCategories(res.data.data.categories));
  }, []);
  return (
    <div className="user-profile">
      <div className="pets-user">
        <ul className="pets-for-adoption">
          {categories?.map((item) => (
            <li key={item.id}>
              <PetCard
                name={item.name}
                petForAdoption={true}
                image={`http://localhost:3001/images/${item.image}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserProfile;

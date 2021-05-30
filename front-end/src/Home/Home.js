import React, { useEffect, useRef, useState } from "react";
import { Button } from "@material-ui/core";
import "./Home.css";
import AnimalList from "../PetAdoption/AnimalList";
import { FaFilter } from "react-icons/fa";
import Select, { components } from "react-select";
import axios from "axios";
const scrollToRef = (ref) => {
  window.scrollTo({ top: ref.current.offsetTop, left: 0, behavior: "smooth" });
};
function Home() {
  const [animals, setAnimals] = useState([]);

  const homePetsRef = useRef(null);
  const handleScroll = () => {
    scrollToRef(homePetsRef);
  };
  const filterTypeOptions = [
    { value: "Cats", label: "Cats" },
    { value: "Dogs", label: "Dogs" },
    { value: "Rabbits", label: "Rabbits" },
  ];
  const [filter, setFilter] = useState({
    type: filterTypeOptions.map((item) => item.value),
  });
  useEffect(() => {
    axios
      .get("http://localhost:3001/pet/get/all")
      .then((res) => setAnimals(res.data.data.animals));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:3001/pet/get/by/filter", {
        params: {
          filter: filter,
        },
      })
      .then((res) => setAnimals(res.data.data.animals));
  }, [filter]);
  const handleFilterChange = (selectedOpt, filterType) => {
    setFilter({
      ...filter,
      [filterType]: selectedOpt.map((item) => item.value),
    });
  };
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <FaFilter />
      </components.DropdownIndicator>
    );
  };
  return (
    <main>
      <section className="home-landing">
        <h1 className="title">Welcome to our pet world!</h1>
        <p className="title-text">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a typespecimen book.
        </p>
        <div style={{ paddingTop: "5vw" }}>
          <Button variant="outlined" color="default" onClick={handleScroll}>
            Разгледайте нашите животни
          </Button>
        </div>
      </section>
      <section className="home-pets" ref={homePetsRef}>
        <div className="filters">
          <Select
            isMulti
            defaultValue={filterTypeOptions.map((item) => item)}
            options={filterTypeOptions}
            className="select"
            placeholder="Filters..."
            required={false}
            components={{ DropdownIndicator }}
            onChange={(evt) => handleFilterChange(evt, "type")}
          />
        </div>
        <AnimalList allAnimals={animals} />
      </section>
    </main>
  );
}

export default Home;

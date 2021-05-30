import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Select from "react-select";
import "./Admin.css";
import {
  TextField,
  Button,
  TextareaAutosize,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import PetCard from "../PetAdoption/PetCard";
import { UserContext } from "../context/UserContext";
import { Adopter } from "../Components/Adopter/Adopter";
function Admin() {
  const [user] = useContext(UserContext);
  const [adopters, setAdopters] = useState([]);
  const [pet, setPet] = useState({
    category: "",
    name: "",
    breed: "",
    age: "",
    sex: "",
    color: "",
    weight: "",
    story: "",
    image: "",
    imageName: "",
  });
  const [medicalInfo, setMedicalInfo] = useState([]);
  const [category, setCategory] = useState({
    name: "",
    image: "",
    imageName: "",
  });
  const [showCardImage, setShowCardImage] = useState({
    category: false,
    pet: false,
  });
  const [addEntity, setAddEntity] = useState("Pet");
  const medicalInfoOptions = [
    { value: "Obezparaziten", label: "Obezparaziten" },
    { value: "Chip", label: "Chip" },
    { value: "Vaksinaciq 1", label: "Vaksinaciq 1" },
    { value: "Vaksinaciq 2", label: "Vaksinaciq 2" },
    { value: "Vaksinaciq 3", label: "Vaksinaciq 3" },
  ];
  const [categoriesOptions, setCategoriesOptions] = useState([]);

  useEffect(() => {
    let copy = [];
    axios.get("http://localhost:3001/categories/get").then((res) => {
      // eslint-disable-next-line
      res.data.data.categories.map((item) => {
        let obj = {
          value: item.name,
          label: item.name,
        };
        copy.push(obj);
      });
    });
    setCategoriesOptions(copy);
  }, [category]);
  useEffect(() => {
    axios
      .get("http://localhost:3001/adoption/get/all")
      .then((res) => setAdopters(res.data.data.adopters));
  }, []);
  const handleInput = ({ target }, src) => {
    if (src === "pet") setPet({ ...pet, [target.name]: target.value });
    else setCategory({ ...category, [target.name]: target.value });
  };
  const confirmAdoption = async (id) => {
    await axios.delete(`http://localhost:3001/adoption/confirm/${id}`);
    await axios
      .get("http://localhost:3001/adoption/get/all")
      .then((res) => setAdopters(res.data.data.adopters));
  };
  const handleSelectChange = (selectedOpt) => {
    setMedicalInfo(selectedOpt.map((item) => item.value));
  };
  const handleCategoryChange = (selectedOpt) => {
    setPet({ ...pet, category: selectedOpt.value });
  };
  const submit = async (evt, src) => {
    evt.preventDefault();
    setShowCardImage({ ...showCardImage, [src]: false });
    if (src === "Pet") {
      fileSubmit(pet.image);
      await axios.post("http://localhost:3001/pet/add", {
        pet: pet,
        medical_info: medicalInfo,
      });

      setPet({
        category: "",
        name: "",
        type: "",
        breed: "",
        age: "",
        sex: "",
        color: "",
        weight: "",
        story: "",
        image: "",
        imageName: "Photo",
      });
    } else if (src === "Category") {
      fileSubmit(category.image);
      await axios.post("http://localhost:3001/categories/add", {
        category: category,
      });

      setCategory({
        name: "",
        image: "",
        imageName: "Photo",
      });
    }
  };
  const fileSubmit = async (file) => {
    const fileData = new FormData();
    fileData.append("file", file);
    try {
      await axios.post("http://localhost:3001/upload", fileData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {}
  };

  const handleFileInput = ({ target }, src) => {
    setShowCardImage({ ...showCardImage, [src]: true });
    if (src === "pet") {
      if (target.files[0] !== undefined) {
        setPet({
          ...pet,
          image: target.files[0],
          imageName: target.files[0].name,
        });
      } else {
        setPet({ ...pet, fileName: "Your file was not uploaded." });
      }
    } else {
      if (target.files[0] !== undefined) {
        setCategory({
          ...category,
          image: target.files[0],
          imageName: target.files[0].name,
        });
      } else {
        setCategory({ ...category, fileName: "Your file was not uploaded." });
      }
    }
  };
  const handleAddEntity = ({ target }) => {
    setAddEntity(target.value);
  };
  return user.type === "admin" ? (
    <section className="admin-section">
      <div className="add-pet-panel">
        <div className="config">
          <div className="config-inputs">
            <h1>Add pet</h1>
            <FormControl
              component="fieldset"
              style={{ marginLeft: "1rem", marginBottom: "1rem", width: "95%" }}
            >
              <FormLabel component="legend" style={{ textAlign: "left" }}>
                Choose what to add
              </FormLabel>
              <RadioGroup
                aria-label="addEntity"
                name="addEntity"
                value={addEntity}
                onChange={handleAddEntity}
              >
                <FormControlLabel
                  value="Pet"
                  control={<Radio color="default" />}
                  label="Pet"
                />
                <FormControlLabel
                  value="Category"
                  control={<Radio color="default" />}
                  label="Category"
                />
              </RadioGroup>
            </FormControl>
            {addEntity === "Category" ? (
              <>
                <TextField
                  value={category.name}
                  required
                  id="outlined-basic"
                  label="Category Name"
                  name="name"
                  onChange={(evt) => handleInput(evt, "category")}
                  style={{
                    marginLeft: "1rem",
                    marginBottom: "1rem",
                    width: "95%",
                  }}
                />
                <div className="file-area">
                  <input
                    type="file"
                    required="required"
                    onChange={(evt) => handleFileInput(evt, "category")}
                  />
                  <div
                    className="file-dummy"
                    style={{ marginLeft: "1rem", marginBottom: "1rem" }}
                  >
                    {/* eslint-disable-next-line */}
                    <div className="success">
                      {category.imageName &&
                        category.imageName.substring(0, 35)}
                    </div>
                    {/* eslint-disable-next-line */}
                    <div className="success">
                      {category.imageName && category.imageName.substring(35)}
                    </div>
                    <div className="default">Photo</div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Select
                  className="select"
                  defaultValue="Cat"
                  placeholder="Select category..."
                  required={true}
                  options={categoriesOptions}
                  onChange={handleCategoryChange}
                />

                <TextField
                  value={pet.name}
                  required
                  id="outlined-basic"
                  label="Name"
                  name="name"
                  onChange={(evt) => handleInput(evt, "pet")}
                  style={{
                    marginLeft: "1rem",
                    marginBottom: "1rem",
                    width: "95%",
                  }}
                />
                <TextField
                  value={pet.breed}
                  required
                  id="outlined-basic"
                  label="Breed"
                  name="breed"
                  onChange={(evt) => handleInput(evt, "pet")}
                  style={{
                    marginLeft: "1rem",
                    marginBottom: "1rem",
                    width: "95%",
                  }}
                />
                <TextField
                  value={pet.age}
                  required
                  id="outlined-basic"
                  label="Age"
                  name="age"
                  onChange={(evt) => handleInput(evt, "pet")}
                  style={{
                    marginLeft: "1rem",
                    marginBottom: "1rem",
                    width: "95%",
                  }}
                />
                <TextField
                  value={pet.weight}
                  required
                  id="outlined-basic"
                  label="Weight"
                  name="weight"
                  onChange={(evt) => handleInput(evt, "pet")}
                  style={{
                    marginLeft: "1rem",
                    marginBottom: "1rem",
                    width: "95%",
                  }}
                />
                <TextField
                  value={pet.color}
                  required
                  id="outlined-basic"
                  label="Color"
                  name="color"
                  onChange={(evt) => handleInput(evt, "pet")}
                  style={{
                    marginLeft: "1rem",
                    marginBottom: "1rem",
                    width: "95%",
                  }}
                />
                <FormControl
                  component="fieldset"
                  style={{
                    marginLeft: "1rem",
                    marginBottom: "1rem",
                    width: "95%",
                  }}
                >
                  <FormLabel component="legend" style={{ textAlign: "left" }}>
                    Sex
                  </FormLabel>
                  <RadioGroup
                    aria-label="sex"
                    name="sex"
                    value={pet.sex}
                    onChange={(evt) => handleInput(evt, "pet")}
                  >
                    <FormControlLabel
                      value="Male"
                      control={<Radio color="default" />}
                      label="Male"
                    />
                    <FormControlLabel
                      value="Female"
                      control={<Radio color="default" />}
                      label="Female"
                    />
                  </RadioGroup>
                </FormControl>
                <TextareaAutosize
                  style={{
                    marginLeft: "1rem",
                    marginBottom: "1rem",
                    width: "95%",
                  }}
                  value={pet.story}
                  name="story"
                  required
                  rowsMin={4}
                  placeholder="Story"
                  onChange={(evt) => handleInput(evt, "pet")}
                />
                <Select
                  className="select"
                  placeholder="Medical info..."
                  required={false}
                  options={medicalInfoOptions}
                  isMulti
                  onChange={handleSelectChange}
                />
                <div className="file-area">
                  <input
                    type="file"
                    required="required"
                    onChange={(evt) => handleFileInput(evt, "pet")}
                  />
                  <div
                    className="file-dummy"
                    style={{ marginLeft: "1rem", marginBottom: "1rem" }}
                  >
                    {/* eslint-disable-next-line */}
                    <div className="success">
                      {pet.imageName && pet.imageName.substring(0, 35)}
                    </div>
                    {/* eslint-disable-next-line */}
                    <div className="success">
                      {pet.imageName && pet.imageName.substring(35)}
                    </div>
                    <div className="default">Photo</div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="config-preview">
            <h1>Preview</h1>
            {addEntity === "Pet" ? (
              <PetCard
                petForAdoption={false}
                isForPreview={true}
                image={
                  pet.image !== "" && pet.image !== undefined
                    ? URL.createObjectURL(pet.image)
                    : `http://localhost:3001/images/${pet.imageName}`
                }
                showImg={showCardImage.pet}
                name={pet.name}
                breed={pet.breed}
                age={pet.age}
                sex={pet.sex}
              />
            ) : (
              <PetCard
                isForPreview={true}
                image={
                  category.image !== "" && category.image !== undefined
                    ? URL.createObjectURL(category.image)
                    : `http://localhost:3001/images${category.imageName}`
                }
                showImg={showCardImage.category}
                name={category.name}
                petForAdoption={true}
              />
            )}

            <Button
              variant="contained"
              color="default"
              onClick={(evt) => submit(evt, addEntity)}
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      <div className="adoption-panel">
        <h1>Adoption list</h1>
        <ul>
          {adopters?.length > 0
            ? adopters.map((adopter) => (
                <li key={adopter.adopterId}>
                  <Adopter
                    petId={adopter.petId}
                    username={adopter.username}
                    email={adopter.email}
                    experience={adopter.experience}
                    conditions={adopter.conditions}
                    otherPets={adopter.otherPets}
                    live={adopter.live}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => confirmAdoption(adopter.adopterId)}
                  >
                    Confirm adoption
                  </Button>
                </li>
              ))
            : null}
        </ul>
      </div>
    </section>
  ) : (
    <section>
      <h1>You are not an admin!</h1>
    </section>
  );
}

export default Admin;

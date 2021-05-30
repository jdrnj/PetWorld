import React, { useContext, useEffect, useState } from "react";
import "./Pet.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const Pet = ({ match }) => {
  const [user] = useContext(UserContext);
  const [adoptionForm, setAdoptionForm] = useState({
    experience: "",
    conditions: "",
    otherPets: "",
    live: "",
  });
  const [animal, setAnimal] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/pet/get/by/id/${match.params.animalId}`)
      .then((res) => setAnimal(res.data.data.animal));
    //eslint-disable-next-line
  }, []);
  const handleModal = () => {
    setOpenModal(!openModal);
  };
  const handleInput = ({ target }) => {
    setAdoptionForm({ ...adoptionForm, [target.name]: target.value });
  };
  const submitAdoption = async () => {
    await axios.post("http://localhost:3001/adoption/new", {
      user: user,
      adoptionForm: adoptionForm,
      animalId: animal.animal_id,
    });
    setOpenModal(false);
  };
  return (
    <section className="pet-section">
      <Modal
        isOpen={openModal}
        onRequestClose={handleModal}
        style={customStyles}
      >
        <div className="modal">
          <TextField
            value={adoptionForm.experience}
            required
            id="outlined-basic"
            label="What is your experience?"
            name="experience"
            style={{
              width: "70%",
            }}
            onChange={handleInput}
          />
          <TextField
            value={adoptionForm.conditions}
            required
            id="outlined-basic"
            label="What conditions can you provide?"
            name="conditions"
            style={{
              width: "70%",
            }}
            onChange={handleInput}
          />
          <TextField
            value={adoptionForm.otherPets}
            required
            id="outlined-basic"
            label="Do you have any other pets?"
            name="otherPets"
            style={{
              width: "70%",
            }}
            onChange={handleInput}
          />
          <TextField
            value={adoptionForm.live}
            required
            id="outlined-basic"
            label="Where will the pet live?"
            name="live"
            style={{
              width: "70%",
            }}
            onChange={handleInput}
          />
          <Button
            disabled={
              !(
                adoptionForm.experience &&
                adoptionForm.conditions &&
                adoptionForm.otherPets &&
                adoptionForm.live
              )
            }
            variant="contained"
            color="primary"
            style={{
              width: "200px",
              backgroundColor: "rgb(15, 184, 15)",
              marginTop: "2rem",
            }}
            onClick={submitAdoption}
          >
            Adopt me!
          </Button>
        </div>
      </Modal>

      <div className="left">
        <div className="image">
          <Carousel autoPlay swipeable={true} showThumbs={false}>
            <img
              src={`http://localhost:3001/images/${animal.image}`}
              alt=""
            ></img>
            <img
              src={`http://localhost:3001/images/${animal.image}`}
              alt=""
            ></img>
            <img
              src={`http://localhost:3001/images/${animal.image}`}
              alt=""
            ></img>
          </Carousel>
        </div>
      </div>
      <div className="right">
        {user.username !== "" ? (
          <Button
            variant="contained"
            color="primary"
            style={{
              width: "200px",
              backgroundColor: "rgb(15, 184, 15)",
              marginBottom: "1.4rem",
            }}
            onClick={handleModal}
          >
            Adopt me!
          </Button>
        ) : null}

        <h2>Personal Info</h2>
        <div className="personal-info">
          <div className="personal-info-specifications">
            <h4>Name</h4>
            <h4>Breed</h4>
            <h4>Color</h4>
            <h4>Age</h4>
            <h4>Sex</h4>
            <h4>Weight</h4>
          </div>
          <div className="personal-info-data">
            <p>{animal.animal_name}</p>
            <p>{animal.breed}</p>
            <p>{animal.color}</p>
            <p>{animal.age}</p>
            <p>{animal.sex}</p>
            <p>{animal.animal_weight}</p>
          </div>
        </div>
        <hr></hr>
        <h2>Medical Info</h2>
        <div className="medical-info">
          <ul className="medical-data-list">
            {animal?.medical_info?.split(",").map((item) => (
              <li className="medical-data-item">{item}</li>
            ))}
          </ul>
        </div>
        <hr></hr>
        <h2>Story</h2>
        <div className="pet-story">{animal.story}</div>
      </div>
    </section>
  );
};

export default Pet;

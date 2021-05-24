import React, { useState, useEffect } from "react";
import RegisterForm from "./RegisterForm";
import RegisterSuccess from "./RegisterSuccess";
import Login from "../Login/Login";
import "./Register.css";
import axios from "axios";

const Register = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <div className="form-container">
      {/* <span className="close-btn">x</span> */}
      {/* <div className="form-content-left">
        <img src="img/img-2.svg" alt="spaceship" className="form-img"/>
      </div> */}
      {!isSubmitted ? <RegisterForm submitForm={submitForm} /> : <Login />}
    </div>
  );
};

export default Register;

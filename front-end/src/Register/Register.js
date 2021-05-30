import React, { useState } from "react";
import RegisterForm from "./RegisterForm";
import Login from "../Login/Login";
import "./Register.css";

const Register = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }

  return (
    <div className="form-container">
      {!isSubmitted ? <RegisterForm submitForm={submitForm} /> : <Login />}
    </div>
  );
};

export default Register;

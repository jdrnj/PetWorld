import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Register.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    type: "user",
  });
  const history = useHistory();
  const handleInput = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) return;

    axios.post("http://localhost:3001/register/new", formData);
    history.push("/Login");
  };
  return (
    <div className="form-content-right">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Добре дошли в нашата регистрационна форма!</h1>
        <div className="form-inputs">
          <TextField
            required
            id="standard-basic"
            label="Username"
            name="username"
            onChange={handleInput}
            type="text"
          />
        </div>
        <div className="form-inputs">
          <TextField
            required
            id="standard-basic"
            label="Email"
            name="email"
            onChange={handleInput}
            type="text"
          />
        </div>
        <div className="form-inputs">
          <TextField
            required
            id="standard-basic"
            label="Password"
            name="password"
            onChange={handleInput}
            type="password"
          />
        </div>
        <div className="form-inputs">
          <TextField
            required
            id="standard-basic"
            label="Confirm Password"
            name="confirmPassword"
            onChange={handleInput}
            type="password"
          />
        </div>
        <Button variant="contained" color="default" type="submit">
          Sign up
        </Button>
        <span className="form-input-login">
          Already have an account? Login <a href="/login">here</a>
        </span>
      </form>
    </div>
  );
};

export default RegisterForm;

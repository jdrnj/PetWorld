import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Login from "../Login/Login";
import useForm from "./useForm";
import validate from "../Components/validateInfo";
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
    type: "guest",
  });
  const history = useHistory();
  const handleInput = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) return;

    axios
      .post("http://localhost:3001/register/new", formData)
      .then((res) => console.log(res));
    history.push("/Login");
  };
  return (
    <div className="form-content-right">
      {console.log(formData)}
      <form className="form" onSubmit={handleSubmit}>
        <h1>Добре дошли в нашата регистрационна форма!</h1>
        <div className="form-inputs">
          {/* <label htmlFor="username" className="form-label">
            Username
          </label> */}
          <TextField
            required
            id="standard-basic"
            label="Username"
            name="username"
            onChange={handleInput}
            type="text"
          />
          {/* <input
            id="username"
            type="text"
            name="username"
            className="form-input"
            placeholder="Enter your username"
            value={values.username}
            onChange={handleChange}
          /> */}
          {/* {errors.username && <p>{errors.username}</p>} */}
        </div>
        <div className="form-inputs">
          {/* <label htmlFor="email" className="form-label">
            Email
          </label> */}
          <TextField
            required
            id="standard-basic"
            label="Email"
            name="email"
            onChange={handleInput}
            type="text"
          />
          {/* <input
            id="email"
            type="text"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
          /> */}
          {/* {errors.email && <p>{errors.email}</p>} */}
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

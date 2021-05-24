import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [Logged, setLogged] = useState(false);

  const handleInput = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();

    const obj = {
      email: formData.email,
      password: formData.password,
    };

    axios
      .get(`http://localhost:3001/login/${formData.email}`)
      // .then((res) => console.log(res.data.msg));
      .then((res) => setFormData(res.data.data.users));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {
          <div className="form-inner">
            <h2>Добре дошли в нашата форма за вход!</h2>
            <div className="form-group">
              <TextField
                required
                id="standard-basic"
                label="Email"
                name="email"
                type="text"
                onChange={handleInput}
              />
              {/* <label htmlFor="name">Name:</label>
                    <input type="text" name="name" id="name" onChange={e => setDetails({...details, name: e.target.value})}
                        value={details.name}/> */}
            </div>
            <div className="form-group">
              <TextField
                required
                id="standard-basic"
                label="Парола"
                name="password"
                type="password"
                onChange={handleInput}
              />
              {/* <label htmlFor="email">Email:</label>
                    <input type="email" name="email" id="email" onChange={e => setDetails({...details, email: e.target.value})}
                        value={details.email}/> */}
            </div>
            {/* <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" id="password" onChange={e => setDetails({...details, password: e.target.value})}
                        value={details.password}/>
                </div> */}

            <Button variant="contained" color="default" type="submit">
              Login
            </Button>
            {/* <Link to='/user'>
                <button onClick={submitHandler}>Login </button>
                </Link> */}
          </div>
        }
      </form>
    </div>
  );
}

export default LoginForm;

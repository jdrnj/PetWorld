import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { UserContext } from "../context/UserContext";
function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();
  const handleInput = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();

    const obj = {
      email: "dancho",
      password: "asdasd",
    };

    await axios
      .post("http://localhost:3001/login/user", formData)
      // .then((res) => console.log(res.data.msg));
      .then((res) =>
        res.data.status === "success" ? setLogged(true) : setLogged(false)
      );

    if (logged) {
      setUser({
        username: "",
        email: formData.email,
        password: formData.password,
        confirmPassword: "",
      });
      history.push("/user");
    }
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

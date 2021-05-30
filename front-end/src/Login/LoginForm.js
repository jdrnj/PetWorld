import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
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
  //eslint-disable-next-line
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();
  const handleInput = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/login/user", formData)
      .then((res) => {
        setUser({
          id: res.data?.data?.user?.u_id,
          email: res.data?.data?.user?.email,
          username: res.data?.data?.user?.username,
          type: res.data?.data?.user?.account_type,
        });
        res.data.status === "success" ? setLogged(true) : setLogged(false);
      });
  };

  return (
    <div>
      {logged ? history.push("/user") : null}
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
            </div>

            <Button variant="contained" color="default" type="submit">
              Login
            </Button>
          </div>
        }
      </form>
    </div>
  );
}

export default LoginForm;

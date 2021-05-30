import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import "./UserProfile.css";
import { UserContext } from "../context/UserContext";
import { Button } from "@material-ui/core";
function UProfileHeader() {
  const [user, setUser] = useContext(UserContext);
  let history = useHistory();
  const logoutHandler = (evt) => {
    evt.preventDefault();
    setUser({
      username: "",
      email: "",
      password: "",
      type: "",
    });
    history.push("/");
  };
  return (
    <header className="profile-header">
      <Link to="/">
        <h2 className="profile-header-title">Welcome, {user.username}</h2>
      </Link>
      <Link to="/user">
        <button className="account-btn">Account</button>
      </Link>
      {user.type === "admin" ? (
        <Link to="/admin">
          <Button variant="contained" color="secondary">
            Admin
          </Button>
        </Link>
      ) : null}

      <button className="logout-btn" onClick={logoutHandler}>
        Logout
      </button>
    </header>
  );
}

export default UProfileHeader;

import React from "react";
import { Link } from "react-router-dom";
import "./UserProfile.css";

function UProfileHeader({ name, Logout }) {
  return (
    <header className="profile-header">
      <h2 className="profile-header-title">Welcome, {name}</h2>
      <Link to="/account">
        <button className="account-btn">Account</button>
      </Link>
      <button className="logout-btn" onClick={Logout}>
        Logout
      </button>
    </header>
  );
}

export default UProfileHeader;

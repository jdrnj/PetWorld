import React, { useState } from "react";
import LoginForm from "./LoginForm";
import "./login.css";
import UserProfile from "../UserProfile/UserProfile";
function Login() {
  const [formData] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="Login">
      {formData.email !== "" ? (
        <div className="welcome">
          <UserProfile />
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default Login;

import React, { useState, useContext } from "react";
import LoginForm from "./LoginForm";
import "./login.css";
import RegisterSuccess from "../Register/RegisterSuccess";
import UserProfile from "../UserProfile/UserProfile";
import UProfileHeader from "../UserProfile/UProfileHeader";
import { UserContext } from "../context/UserContext";
function Login() {
  // const adminUser = {
  //   email: "admin@admin.com",
  //   password: "admin123",
  // };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useContext(UserContext);
  const [error, setError] = useState("");

  // const Login = (details) => {
  //   console.log(details);

  //   if (
  //     details.email === adminUser.email &&
  //     details.password === adminUser.password
  //   ) {
  //     console.log("Logged in");
  //     setUser({
  //       username: details.name,
  //       email: details.email,
  //     });
  //   } else {
  //     console.log("Details don't match");
  //     setError("Details do not match!");
  //   }
  // };

  return (
    <div className="Login">
      {formData.email !== "" ? (
        <div className="welcome">
          {/* <UProfileHeader name={user.name} Logout={Logout} /> */}
          <UserProfile />
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default Login;

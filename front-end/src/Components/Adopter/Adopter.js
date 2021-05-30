import React from "react";
import "./Adopter.css";
export const Adopter = ({
  username,
  email,
  experience,
  conditions,
  otherPets,
  live,
  petId,
}) => {
  return (
    <div className="card-wrapper">
      <div className="adopter-card">
        <details open>
          <summary>{username}</summary>
          <div className="card-content">
            <p>
              <span style={{ fontWeight: "bold" }}>Username</span>
              {username}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Email </span>
              {email}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Pet ID</span>
              {petId}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Has experience</span>
              {experience}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>
                Has conditions to raise the pet
              </span>
              {conditions}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Has other pets</span>
              {otherPets}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>
                Pet wil live : outside/inside
              </span>
              {live}
            </p>
          </div>
        </details>
      </div>
    </div>
  );
};

import React from "react";
import "./PetCard.css";
import { Link } from "react-router-dom";
function PetCard({
  id,
  name,
  breed,
  age,
  sex,
  category,
  petForAdoption,
  isForPreview,
  showImg,
  image,
}) {
  return petForAdoption ? (
    isForPreview ? (
      <div className="pet">
        <div className="pet-image">
          <img src={image} alt="" />
          <div className="pet-for-adoption-button">View All {name}</div>
        </div>
      </div>
    ) : (
      <div className="pet">
        <div className="pet-image">
          <img src={image} alt="" />
          <Link to={`${name}s`}>
            <div className="pet-for-adoption-button">View All {name}</div>
          </Link>
        </div>
      </div>
    )
  ) : isForPreview ? (
    <div className="pet">
      <div className="pet-image">
        {showImg ? <img src={image} alt="" /> : null}
      </div>
      <div className="pet-card-content">
        <h3 className="pet-name">{name}</h3>
        <p className="pet-details">{breed}</p>
        <p className="pet-details">{age}</p>
        <p className="pet-details">{sex}</p>
        <button className="btn card_btn">Read More</button>
      </div>
    </div>
  ) : (
    <div className="pet">
      <div className="pet-image">
        <img src={image} alt="" />
      </div>
      <div className="pet-card-content">
        <h3 className="pet-name">{name}</h3>
        <p className="pet-details">{breed}</p>
        <p className="pet-details">{age}</p>
        <p className="pet-details">{sex}</p>
        <Link to={`/${category}/${id}`}>
          <button className="btn card_btn">Read More</button>
        </Link>
      </div>
    </div>
  );
}

export default PetCard;

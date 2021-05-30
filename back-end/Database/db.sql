CREATE DATABASE animals;

CREATE TABLE users(
    u_id SERIAL PRIMARY KEY NOT NULL,
    username VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(50) NOT NULL,
    account_type VARCHAR(10) NOT NULL,
    UNIQUE (email)
);

CREATE TABLE category(
    id SERIAL PRIMARY KEY NOT NULL,
    Name VARCHAR (200) NOT NULL,
    image VARCHAR(100) NOT NULL
);
CREATE TABLE adopter(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT REFERENCES users(u_id) NOT NULL,
    experience VARCHAR(100) NOT NULL,
    conditions VARCHAR(100) NOT NULL,
    other_pets VARCHAR(50) NOT NULL,
    live VARCHAR(50) NOT NULL,
    pet_id INT REFERENCES animal(animal_id) NOT NULL
);
CREATE TABLE animal(
    animal_id SERIAL PRIMARY KEY NOT NULL,
    category_id INT REFERENCES category(id) NOT NULL,
    category_name VARCHAR(30) NOT NULL,
    animal_name VARCHAR(200) NOT NULL,
    breed VARCHAR(100),
    age VARCHAR(20),
    sex VARCHAR(10),
    color VARCHAR(20),
    animal_weight NUMERIC,
    story VARCHAR(300),
    medical_info VARCHAR(200),
    image VARCHAR(100) NOT NULL
);

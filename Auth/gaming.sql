CREATE DATABASE IF NOT EXISTS games;
USE games;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userName VARCHAR(255) UNIQUE NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    game1 INT DEFAULT 0,
    game2 INT DEFAULT 0,
    game3 INT DEFAULT 0
);
INSERT INTO users (username, firstName, lastName, email, password) VALUES ('tesztFelhasznalo', 'Horváth', 'Márton', 'martonbeh@gmail.com', '134b0361359a8b24534d36eef8e57101');

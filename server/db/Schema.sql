CREATE DATABASE IF NOT EXISTS sigsa_reservation;

USE sigsa_reservation;

CREATE TABLE IF NOT EXISTS restaurants (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  restaurantId VARCHAR(100) NOT NULL,
  restaurantName VARCHAR(1000) NOT NULL,
  timeSlot FLOAT NOT NULL, 
  availableSeats INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS reservations (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  restaurantId VARCHAR(100) NOT NULL,
  start_time INTEGER NOT NULL,
  end_time INTEGER NOT NULL, 
  partySize INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS bookingCount (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  restaurantId VARCHAR(100) NOT NULL,
  bookingCount INTEGER NOT NULL DEFAULT 0
);
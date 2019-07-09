CREATE DATABASE IF NOT EXISTS reservations;

USE reservations;

CREATE TABLE IF NOT EXISTS reservations_tables (
  id INT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id VARCHAR(100) NOT NULL,
  restaurant_name VARCHAR(1000) NOT NULL,
  reservationTimeStamp INTEGER NOT NULL, 
  availableSeats INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS reservations_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  restaurant_id VARCHAR(100) NOT NULL,
  restaurant_name VARCHAR(1000) NOT NULL,
  reservationTimeStamp INTEGER NOT NULL, 
  partySize INTEGER NOT NULL
);
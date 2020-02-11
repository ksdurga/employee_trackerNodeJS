DROP DATABASE IF EXISTS employee_managementDB;

-- Create the database employeeDB and specified it for use.
CREATE DATABASE employee_managementDB;

USE employee_managementDB;

-- Create the table movies.
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT(5) NOT NULL,
  manager_id INT(5),
  PRIMARY KEY (id)
);


CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10, 2) NOT NULL,
  department_id INT(5),
  PRIMARY KEY (id)
);

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);


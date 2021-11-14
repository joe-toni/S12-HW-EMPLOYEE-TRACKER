DROP  DATABASE IF EXISTS  employee_management_db;
CREATE DATABASE employee_management_db;

USE employee_management_db;

DROP TABLE IF EXISTS department;
CREATE TABLE department
(
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,

    PRIMARY KEY (id),
    UNIQUE KEY (name)
);

DROP TABLE IF EXISTS role;
CREATE TABLE role
(
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    department_id  INT,

    FOREIGN KEY (department_id) 
    REFERENCES department(id)
    ON DELETE SET NULL,

    PRIMARY KEY (id),
    UNIQUE KEY (title)
);

DROP TABLE IF EXISTS employee;
CREATE TABLE employee
(
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,

    FOREIGN KEY (role_id)
    REFERENCES role (id)
    ON DELETE SET NULL,

    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL,

    PRIMARY KEY (id)
);


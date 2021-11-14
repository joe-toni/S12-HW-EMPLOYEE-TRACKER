SELECT * FROM department;
SELECT * FROM role;
SELECT * FORM employee;
SELECT  *  FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id;

SELECT name AS Departments, id  AS Department_id FROM department;

SELECT  name FROM department;

SELECT id FROM department WHERE name = "regulatory";


SELECT A.id As Employee_id, 
A.first_name, A.last_name, title AS Title, name AS Department_Name, 
salary AS Salary, CONCAT(B.first_name,' ', B.last_name) AS Manager 
FROM employee A  LEFT JOIN employee B ON A.manager_id = B.id 
JOIN role ON A.role_id = role.id JOIN department ON role.department_id = department.id;


SELECT A.id As Employee_id, 
A.first_name, A.last_name, title AS Title, name AS Department_Name, 
salary AS Salary, CONCAT(B.first_name,' ', B.last_name) AS Manager 
FROM employee A  LEFT JOIN employee B ON A.manager_id = B.id 
JOIN role ON A.role_id = role.id JOIN department ON role.department_id = department.id WHERE A.id = "1";


SELECT title AS Job_Title, role.id AS Role_id, name AS Department, salary AS Salary
FROM role JOIN department WHERE role.department_id = department.id ORDER BY Role_id ASC;

SELECT title AS Job_Title, role.id AS Role_id, name AS Department, salary AS Salary 
FROM role JOIN department ON role.department_id = department.id WHERE role.id = "2" ;
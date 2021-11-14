class Employees
{
     constructor(db)
    {
        this.db = db;
        this.questions = 
        [
            {
                name: "firstName",
                type: "input",
                message: "What is the first name of the new employee?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What is the last name of the new employee?"
            }
        ];
    }
};

Employees.prototype.showAll = async function()
{
    console.log("\nDisplaying All Employees. \n");
    var  query = "SELECT A.id As Employee_id, " +
                                " A.first_name, A.last_name, title AS Title, name AS Department_Name, " +
                                "salary AS Salary, CONCAT(B.first_name,' ', B.last_name) AS Manager " +
                                "FROM employees A  LEFT JOIN employees B ON A.manager_id = B.id " +
                                " JOIN roles ON A.role_id = roles.id JOIN departments ON roles.department_id = departments.id;";
    let all =  await this.db.promise().query(query);
    return all[0];
};

Employees.prototype.getAll = async function()
{
    let allEmployees = [];
    let all = await this.db.promise().query(`SELECT CONCAT(first_name," ", last_name)  AS Employee_name FROM employees`);
    all[0].forEach(element => {allEmployees.push(element.Employee_name)});
    return allEmployees;
};

Employees.prototype.findID = async function(name)
{
    if (name === "None")
    {
        return -1;
    }
    let splitName = name.split(" ");
    var employeeID = await this.db.promise().query(`SELECT id FROM employees WHERE first_name = "${splitName[0]}" and  last_name = "${splitName[1]}"`);
    return employeeID[0][0].id;
};

Employees.prototype.add = async function(first_name, last_name, roleID, managerID)
{
    if (managerID === -1)
    {await this.db.promise().query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", "${roleID}", NULL);`);}
    else
    { await this.db.promise().query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", "${roleID}", "${managerID}");`);}
     let name = first_name + " " + last_name;
     let currentID =  await this.findID(name);
     console.log("\nNew Employee Added. \n");
     var  query = "SELECT A.id As Employee_id, " +
                                 " A.first_name, A.last_name, title AS Title, name AS Department_Name, " +
                                 "salary AS Salary, CONCAT(B.first_name,' ', B.last_name) AS Manager " +
                                 "FROM employees A LEFT JOIN employees B ON A.manager_id = B.id " +
                                 ` JOIN roles ON A.role_id = roles.id JOIN departments ON roles.department_id = departments.id WHERE A.id = "${currentID}" ;`;
     let result =  await this.db.promise().query(query);
     console.table(result[0]);
     return "success";
}

module.exports = Employees;



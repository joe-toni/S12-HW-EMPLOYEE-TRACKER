//This class is meant to interact with the employee table in our employee_management_db database it uses a variable named db to 
// represent the database connection which will be provided by the user file upon creation of the class instance. All of the methods
// are initiated as async so that the user program may correctly wait for a response from our queries before moving on to any other step
class Employees
{
     constructor(db)
    {
        this.db = db;
        //This attribute is meant to hold the text input type prompts  that will be used to create the new db instance since this prompts do 
        // not require reference any other existing instances for input it can remain constant and thus is stored here directly on the class.
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

//This method uses a prepared query string to format a table which will  be passes back with all the information about existing employees
Employees.prototype.showAll = async function()
{
    console.log("\nDisplaying All Employees. \n");
    var  query = "SELECT A.id As Employee_id, " +
                                " A.first_name, A.last_name, title AS Title, name AS Department_Name, " +
                                "salary AS Salary, CONCAT(B.first_name,' ', B.last_name) AS Manager " +
                                "FROM employee A  LEFT JOIN employee B ON A.manager_id = B.id " +
                                " JOIN role ON A.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY Employee_id ASC;";
    let all =  await this.db.promise().query(query);
    return all[0];
};

//This function gets all concatenated employee first and last names before saving each one to an array that is returned to the caller
Employees.prototype.getAll = async function()
{
    let allEmployees = [];
    let all = await this.db.promise().query(`SELECT CONCAT(first_name," ", last_name)  AS Employee_name FROM employee`);
    all[0].forEach(element => {allEmployees.push(element.Employee_name)});
    return allEmployees;
};

//This function finds the corresponding employee id by finding the employee instance that matches both the first and last name if none is passed in
//for the name then an integer value of -1 is returned to the caller
Employees.prototype.findID = async function(name)
{
    if (name === "None")
    {
        return -1;
    }
    let splitName = name.split(" ");
    var employeeID = await this.db.promise().query(`SELECT id FROM employee WHERE first_name = "${splitName[0]}" and  last_name = "${splitName[1]}"`);
    return employeeID[0][0].id;
};

//This function creates a new instance on the employee table with the manager id value set to null If none exists as determined by previous steps. other wise it uses the 
// values pass in to INSERT the new row into the employee table before displaying the result using the newly established employe id to locate the correct row
Employees.prototype.add = async function(first_name, last_name, roleID, managerID)
{
    if (managerID === -1)
    {await this.db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", "${roleID}", NULL);`);}
    else
    { await this.db.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first_name}", "${last_name}", "${roleID}", "${managerID}");`);}
     let name = first_name + " " + last_name;
     let currentID =  await this.findID(name);
     console.log("\nNew Employee Added. \n");
     var  query = "SELECT A.id As Employee_id, " +
         " A.first_name, A.last_name, title AS Title, name AS Department_Name, " +
        "salary AS Salary, CONCAT(B.first_name,' ', B.last_name) AS Manager " +
        "FROM employee A  LEFT JOIN employee B ON A.manager_id = B.id " +
        ` JOIN role ON A.role_id = role.id JOIN department ON role.department_id = department.id WHERE A.id = "${currentID}";`;
     let result =  await this.db.promise().query(query);
     console.table(result[0]);
     return "success";
};

//This function uses the passed in employee id to display the selected instance information before updating the table at that location and again displaying
// the selected row this time with the updated employee role for comparison
Employees.prototype.updatetRole = async function(employeeID, roleID)
{   
    var  query = "SELECT A.id As Employee_id, " +
    " A.first_name, A.last_name, title AS Title, name AS Department_Name, " +
   "salary AS Salary, CONCAT(B.first_name,' ', B.last_name) AS Manager " +
   "FROM employee A  LEFT JOIN employee B ON A.manager_id = B.id " +
   ` JOIN role ON A.role_id = role.id JOIN department ON role.department_id = department.id WHERE A.id = "${employeeID}";`;

    console.log("\nOriginal Employee Data \n");
    let before = await this.db.promise().query(query);
    console.table(before[0]);

    await this.db.promise().query(`UPDATE employee SET role_id = "${roleID}" WHERE id = "${employeeID}"`);
    console.log("\nUpdated Employee Role \n");
    let result =  await this.db.promise().query(query);
    console.table(result[0]);
    return "success";

} 

module.exports = Employees;



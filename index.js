//Starting off by bringing in all the class constructors that will represent each of the tables in this data base
const Database = require('./classes/database');
const Departments = require('./classes/department');
const Employees = require('./classes/employee');
const Roles = require('./classes/role');

//This brings in the connnection to my sql from a separate file 
const db = require('./connection');

// This is the setup for using my sql directly in our application for the sake of convinience it will be left
// commented out in the applictation files pushed up to the repo in order use this portion comment out the 
//variable above and uncomment the portion below, then enter your own mysql password into the file before running the program.
/*
const mysql = require('mysql2');
const db =  mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: "YOUR PASSWORD HERE",
        database: 'employee_management_db'
    },
    console.log("Connected to the employee_management_db.")
    );
 */

//Here we bring in the node modules installed from our dependancies
const cTable = require('console.table');
const inquire = require('inquirer');

//Here we establish a new instance of each table class we brought in passing in our database
//connection so we don't have to connect each class file directly to our mysql connection.
const manage = new Database(db);
const departments = new Departments(db);
const employees = new Employees(db);
const roles = new Roles(db);

// This is the main question that will repeatedly get the user input while the application is running, it will be handed
// into the query prompt located at the start of every while loop iteration in the init function
 const mainQuestion = 
 [
     {
         name: "next",
         type: "list",
         message: "Select the Action you would like to take: ",
        choices: ['View All Departments','View All Roles','View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', "Update Employee Role", 'Quit']
     }
 ]

 //This function will initialize and run our program it will use a while loop to continously prompt the user for input and run as long as the user does not select 
 // the quit option form the command line prompt. There is a if / else if statment ment to carry out intructions based on any possible selection  made by the user.
async function init()
{
    let finished = false;
    while(!finished)
    {
        finished = true;
        //This statement will trigger when the user choses View all departments and simply tables the awaited response from the query to the department.showAll() function;
        let nextInput = await inquire.prompt(mainQuestion);
        if (nextInput.next === "View All Departments")
        {
            finished = false;
            console.table(await departments.showAll());
        }
        //This option performs similarly to the one above with the call being made to the roles table db class instead
        else if (nextInput.next === "View All Roles")
        {
            finished = false;
            console.table(await roles.showAll());
        }
        //This option performs similarly to the ones above with the call being made to the employees table db class instead
        else if (nextInput.next === "View All Employees")
        {
            finished = false;
            console.table(await employees.showAll());
        }
        //This option gets the question stored in the department table class and uses it to prompt the user for the name of  new department
        // before passing the input to a method of the class that creates the new instance in the corresponding table.
        else if (nextInput.next === "Add a Department")
        {
            finished = false;
            let newDepartmentName = await inquire.prompt(departments.questions);
            await departments.add(newDepartmentName.name);
        }
        //This option performs similarly to the one above for the title, and salary of the new role, then it gets all current departments from a call
        // to the depatments.getAll() method which returns an array of all department names and uses it to populate the options field
        // of the prompt ment to get the department of the new role. It then uses the selected name to find the corresponding department id 
        //before handing all gathered information to the roles.add() method wich inserts the new instance.
        else if (nextInput.next === "Add a Role")
        {
            finished = false;
            let allDepartments = await departments.getAll();
            let newRole = await inquire.prompt(roles.questions);
            let newRoleDepartment = await inquire.prompt(
                {
                    name: "name",
                    type: "list",
                    message: "What is the department of the new role?",
                    choices: allDepartments
                });
            let departmentId = await departments.findID(newRoleDepartment.name);
            await roles.add(newRole.name, newRole.salary, departmentId);
        }
        //This option performs similarly to the one above but uses two list/prompt setups to get the role id, and the id of the employee selected to be 
        // the manager of this new entry before handing all gathered information to the .add() method of the employee database table class.
        else if (nextInput.next === "Add an Employee")
        {
            finished = false;
            let allRoles = await roles.getAll();
            let allEmployees = await employees.getAll();
            allEmployees.push("None");
            let newEmployeeName = await inquire.prompt(employees.questions);
            let newEmployeeRole = await inquire.prompt(
                {
                    name: "name",
                    type: "list",
                    message: "What is the role of the new employee?",
                    choices: allRoles
                });
            let newEmployeeManager = await inquire.prompt(
                {
                    name: "name",
                    type: "list",
                    message: "Who is the manager of the new employee?",
                    choices: allEmployees
                });
            let roleID = await roles.findID(newEmployeeRole.name);
            let managerID = await employees.findID(newEmployeeManager.name);
            await employees.add(newEmployeeName.firstName, newEmployeeName.lastName, roleID, managerID);
        }
        //This method performs similarly to the one above but the list/prompt setup is used to get the name of the existing employee, and the title of the existing role
        // being assigned. All this before obtaining the corresponding ids and passing them into the employee class method that updates the table
        else if (nextInput.next === "Update Employee Role")
        {
            finished = false;
            let allRoles = await roles.getAll();
            let allEmployees = await employees.getAll();
            let selectedEmployee = await inquire.prompt(
                {
                    name: "name",
                    type: "list",
                    message: "What is the name of the employee you would like to update?",
                    choices: allEmployees
                });
            let newRole = await inquire.prompt(
                {
                    name: "name",
                    type: "list",
                    message: "What is the role you would like to assign?",
                    choices: allRoles
                });
                let roleID = await roles.findID(newRole.name);
                let employeeID = await employees.findID(selectedEmployee.name);
                await employees.updatetRole(employeeID, roleID);
        }

    }
    //This process.exit() will end the program when the user selects the quit option on the main prompt
    process.exit();
}

init();
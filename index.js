
const Database = require('./classes/database');
const Departments = require('./classes/department');
const Employees = require('./classes/employee');
const Roles = require('./classes/role');

const db = require('./connection');
const cTable = require('console.table');
const inquire = require('inquirer');

const manage = new Database(db);
const departments = new Departments(db);
const employees = new Employees(db);
const roles = new Roles(db);


 const mainQuestion = 
 [
     {
         name: "next",
         type: "list",
         message: "Select the Action you would like to take: ",
        choices: ['View All Data', 'View All Departments','View All Roles','View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Quit']
     }
 ]

 
async function init()
{
    let finished = false;
    while(!finished)
    {
        finished = true;
        let nextInput = await inquire.prompt(mainQuestion);
        if (nextInput.next === "View All Data")
        {
            finished = false;
            console.table(await manage.showAll());
        }
        else if (nextInput.next === "View All Departments")
        {
            finished = false;
            console.table(await departments.showAll());
        }
        else if (nextInput.next === "View All Roles")
        {
            finished = false;
            console.table(await roles.showAll());
        }
        else if (nextInput.next === "View All Employees")
        {
            finished = false;
            console.table(await employees.showAll());
        }
        else if (nextInput.next === "Add a Department")
        {
            finished = false;
            let newDepartmentName = await inquire.prompt(departments.questions);
        }
        else if (nextInput.next === "Add a Role")
        {
            finished = false;
            let allDepartments = await departments.getAll();
            let newRole = await inquire.prompt(roles.questions);
            let newRoleDepartment = await inquire.prompt(
                {
                    name: "selection",
                    type: "list",
                    message: "What is the department of the new role?",
                    choices: allDepartments
                });
        }
        else if (nextInput.next === "Add an Employee")
        {
            finished = false;
            let allRoles = await roles.getAll();
            let newEmployeeName = await inquire.prompt(employees.questions);
            let newEmployeeRole = await inquire.prompt(
                {
                    name: "selection",
                    type: "list",
                    message: "What is the role of the new employee?",
                    choices: allRoles
                });
        }
    }

}

init();
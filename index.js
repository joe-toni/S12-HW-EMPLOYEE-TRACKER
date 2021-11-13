
const Database = require('./classes/database');
const Departments = require('./classes/department');
const Employees = require('./classes/employee');
const Roles = require('./classes/role');

const db = require('./connection');
const cTable = require('console.table');


const manage = new Database(db);
 const departments = new Departments(db);
 const employees = new Employees(db);
 const roles = new Roles(db);

async function init()
{
    console.table( await manage.showAll());
    console.table(  await departments.showAll());
    console.table( await employees.showAll());
    console.table(  await roles.showAll());
}

init();
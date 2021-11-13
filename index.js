const mysql = require('mysql2');

const Department = require('./classes/department');

const db = require('./connection');


db.query('SHOW TABLES', (err, result) => 
{
    if (err){console.log(err);}
    console.log(result);
});

const janitorial = new Department('timmi');
janitorial.saveToDB(db);

db.query('SELECT * FROM departments', )
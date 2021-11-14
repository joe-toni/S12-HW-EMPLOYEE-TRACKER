class Database
{
    constructor(db)
    {
        this.db = db;
    }
};

Database.prototype.showAll = async function()
{
    console.log( "\nDisplaying All Data \n");
    let all =  await this.db.promise().
    query('SELECT * FROM employee LEFT JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ;');
    return all[0];
};



module.exports = Database;

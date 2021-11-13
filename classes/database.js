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
    query('SELECT  *  FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id;');
    return all[0];
};



module.exports = Database;

class Departments
{
     constructor(db)
    {
        this.db = db;
    }
}



Departments.prototype.showAll = async function()
{
    console.log("Displaying All Departments. \n");
    let all =  await this.db.promise().query('SELECT name AS Departments, id  AS Department_id FROM departments;');
    return all[0];
};

module.exports = Departments;
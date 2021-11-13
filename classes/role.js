class Roles
{
     constructor(db)
    {
        this.db = db;
    }
}

Roles.prototype.showAll = async function()
{
    console.log("Displaying All Roles. \n");
    let query = "SELECT title AS Job_Title, roles.id AS Role_id, name AS Department, salary AS Salary " +
                        " FROM roles JOIN departments WHERE roles.department_id = departments.id;";
    let all =  await this.db.promise().query(query);
    return all[0];
};


module.exports = Roles;


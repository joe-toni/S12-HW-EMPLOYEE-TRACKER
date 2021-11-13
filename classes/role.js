class Roles
{
     constructor(db)
    {
        this.db = db;
        this.questions = 
        [
            {
                name: "name",
                type: "input",
                message: "What is the name of the new role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of the new role?"
            }
        ];
    }
}

Roles.prototype.showAll = async function()
{
    console.log("\nDisplaying All Roles. \n");
    let query = "SELECT title AS Job_Title, roles.id AS Role_id, name AS Department, salary AS Salary " +
                        " FROM roles JOIN departments WHERE roles.department_id = departments.id;";
    let all =  await this.db.promise().query(query);
    return all[0];
};

Roles.prototype.getAll = async function()
{
    let allRoles = [];
    let all = await this.db.promise().query(`SELECT  title FROM roles`);
    all[0].forEach(element => {allRoles.push(element.title)});
    return allRoles;
}

Roles.prototype.findID = async function(name)
{
    var roleID = await this.db.promise().query(`SELECT id FROM roles WHERE title = "${name}"`);
    return roleID[0][0].id;
}


module.exports = Roles;


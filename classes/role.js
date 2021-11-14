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

Roles.prototype.add = async function(name, salary, department_id)
{
     await this.db.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES ("${name}", "${salary}", "${department_id}");`);
     let currentID = await this.findID(name);
     let query = "SELECT title AS Job_Title, roles.id AS Role_id, name AS Department, salary AS Salary " +
                        ` FROM roles JOIN departments WHERE roles.department_id = departments.id AND roles.id = "${currentID}";`;
    let result =  await this.db.promise().query(query);     
    console.log('\n New Role Added \n')
    console.table(result[0]);
     return "success";
};


module.exports = Roles;


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
    let query = "SELECT title AS Job_Title, role.id AS Role_id, name AS Department, salary AS Salary " +
                        " FROM role JOIN department WHERE role.department_id = department.id ORDER BY Role_id ASC;";
    let all =  await this.db.promise().query(query);
    return all[0];
};

Roles.prototype.getAll = async function()
{
    let allRoles = [];
    let all = await this.db.promise().query(`SELECT  title FROM role`);
    all[0].forEach(element => {allRoles.push(element.title)});
    return allRoles;
}

Roles.prototype.findID = async function(name)
{
    var roleID = await this.db.promise().query(`SELECT id FROM role WHERE title = "${name}"`);
    return roleID[0][0].id;
}

Roles.prototype.add = async function(name, salary, department_id)
{
     await this.db.promise().query(`INSERT INTO role (title, salary, department_id) VALUES ("${name}", "${salary}", "${department_id}");`);
     let currentID = await this.findID(name);
     let query = "SELECT title AS Job_Title, role.id AS Role_id, name AS Department, salary AS Salary " +
        ` FROM role JOIN department ON role.department_id = department.id WHERE role.id = "${currentID}";`;
    let result =  await this.db.promise().query(query);     
    console.log('\n New Role Added \n')
    console.table(result[0]);
     return "success";
};


module.exports = Roles;


//This class is meant to interact with the employee table in our employee_management_db database it uses a variable named db to 
// represent the database connection which will be provided by the user file upon creation of the class instance. All of the methods
// are initiated as async so that the user program may correctly wait for a response from our queries before moving on to any other step
class Roles
{
     constructor(db)
    {
        this.db = db;
        //This attribute is meant to hold the text input type prompts  that will be used to create the new db instance since this prompts do 
        // not require reference any other existing instances for input they can remain constant and thus is stored here directly on the class.
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

//This method formats the roles table to display along with the associated department name before returning the result to user
Roles.prototype.showAll = async function()
{
    console.log("\nDisplaying All Roles. \n");
    let query = "SELECT title AS Job_Title, role.id AS Role_id, name AS Department, salary AS Salary " +
                        " FROM role JOIN department WHERE role.department_id = department.id ORDER BY Role_id ASC;";
    let all =  await this.db.promise().query(query);
    return all[0];
};

//This method collects the titles of all existing roles in an array that gets returned to the caller
Roles.prototype.getAll = async function()
{
    let allRoles = [];
    let all = await this.db.promise().query(`SELECT  title FROM role`);
    all[0].forEach(element => {allRoles.push(element.title)});
    return allRoles;
}

//This method uses the passed in role title to find the corresponding id before returning the exact selected value from the resulting table
Roles.prototype.findID = async function(title)
{
    var roleID = await this.db.promise().query(`SELECT id FROM role WHERE title = "${title}"`);
    return roleID[0][0].id;
}

//This method uses the passed in values to update the role table, INSERTING the new row before displaying the results using the newly established
// role_id to locate the instance on the table and tabling the result.
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


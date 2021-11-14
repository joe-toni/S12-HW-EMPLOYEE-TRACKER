class Departments
{
     constructor(db)
    {
        this.db = db;
        this.questions = 
        [
            {
                name: "name",
                type: "input",
                message: "What is the name of the new department?"
            }
        ];
    }
}

Departments.prototype.showAll = async function()
{
    console.log("\nDisplaying All Departments. \n");
    let all =  await this.db.promise().query('SELECT name AS Departments, id  AS Department_id FROM departments;');
    return all[0];
};

Departments.prototype.getAll = async function()
{
    let allDepartments = [];
    let all = await this.db.promise().query(`SELECT  name FROM departments;`);
    all[0].forEach(element => {allDepartments.push(element.name)});
    return allDepartments;
};

Departments.prototype.findID = async function(name)
{
    var departmentID = await this.db.promise().query(`SELECT id FROM departments WHERE name = "${name}";`);
    return departmentID[0][0].id;
};

Departments.prototype.add = async function(name)
{
     await this.db.promise().query(`INSERT INTO departments (name) VALUES ("${name}");`);
     let currentID = await this.findID(name);
     let result =  await this.db.promise().query(`SELECT name AS Department, id  AS Department_id FROM departments WHERE id = "${currentID}";`);
     console.log('\n New Department Added \n')
     console.table(result[0]);
     return "success";
};


module.exports = Departments;
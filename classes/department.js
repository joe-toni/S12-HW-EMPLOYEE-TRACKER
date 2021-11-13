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
    let all = await this.db.promise().query(`SELECT  name FROM departments`);
    all[0].forEach(element => {allDepartments.push(element.name)});
    return allDepartments;
}



module.exports = Departments;
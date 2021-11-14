//This class is meant to interact with the department table in our employee_managemen_db database it uses a variable named db to 
// represent the database connection which will be provided by the user file upon creation of the class instance. All of the methods
// are initiated as async so that the user program may correctly wait for a response from our queries before moving on to any other step
class Departments
{
     constructor(db)
    {
        this.db = db;
        //This attribute is meant to hold the text input type prompt  that will be used to create the new db instance since this prompt does 
        // not require reference any other existing instances for input it can remain constant and thus is stored here directly on the class.
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

//This method returns a table of all departments as formated by the string in the query
Departments.prototype.showAll = async function()
{
    console.log("\nDisplaying All Departments. \n");
    let all =  await this.db.promise().query('SELECT name AS Departments, id  AS Department_id FROM department ORDER BY Department_id ASC;');
    return all[0];
};

//This method uses a query to get all the department names from our db before saving the actuall string values onto an array that is then returned
Departments.prototype.getAll = async function()
{
    let allDepartments = [];
    let all = await this.db.promise().query(`SELECT  name FROM department;`);
    all[0].forEach(element => {allDepartments.push(element.name)});
    return allDepartments;
};

//This method uses the name passed in to find the corresponding department id before returning the exact selected value from the response table
Departments.prototype.findID = async function(name)
{
    var departmentID = await this.db.promise().query(`SELECT id FROM department WHERE name = "${name}";`);
    return departmentID[0][0].id;
};

//This method uses the name passed in to INSERT the new instance into the departments table before finding the id of the newly established instance,
//and using it to display the new department information
Departments.prototype.add = async function(name)
{
     await this.db.promise().query(`INSERT INTO department (name) VALUES ("${name}");`);
     let currentID = await this.findID(name);
     let result =  await this.db.promise().query(`SELECT name AS Department, id  AS Department_id FROM department WHERE id = "${currentID}";`);
     console.log('\n New Department Added \n')
     console.table(result[0]);
     return "success";
};


module.exports = Departments;
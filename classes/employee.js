class Employees
{
     constructor(db)
    {
        this.db = db;
    }
};

Employees.prototype.showAll = async function()
{
    console.log("Displaying All Employees. \n");
    var  query = "SELECT A.id As Employee_id, " +
                                " A.first_name, A.last_name, title AS Title, name AS Department_Name, " +
                                "salary AS Salary, CONCAT(B.first_name,' ', B.last_name) AS Manager " +
                                "FROM employees A JOIN employees B ON A.manager_id = B.id " +
                                " JOIN roles ON A.role_id = roles.id JOIN departments ON roles.department_id = departments.id;";
    let all =  await this.db.promise().query(query);
    return all[0];
};


module.exports = Employees;



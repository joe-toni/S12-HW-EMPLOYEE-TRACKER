class Department
{
    constructor(name)
    {
        this.name = name;
    }
}



Department.prototype.getName = function(){return this.name};

Department.prototype.saveToDB = function(db)
{
    db.query(`INSERT INTO departments (name) VALUES (?)`, this.name,  function(err, result)
    {
        if (err) {console.log(err)}
        console.log(result);
    });
};

module.exports = Department;
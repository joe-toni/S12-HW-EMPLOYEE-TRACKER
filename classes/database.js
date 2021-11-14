//This class was initially intended to perform all editing interactions with the database such as
// insert, delete, and update how ever I realized how specific queries to each portion needed to be
// making this one class responsible for all queries would have needed to take into account all neccessary 
// table names, joins, column names, values, etc. So instead I opted to create several classes similar to this one
// that would specifically handle a designated table in order to keep corresponding methods organized.
class Database
{
    constructor(db)
    {
        this.db = db;
    }
};

Database.prototype.showAll = async function()
{
    console.log( "\nDisplaying All Data \n");
    let all =  await this.db.promise().
    query('SHOW TABLES;');
    return all[0];
};



module.exports = Database;

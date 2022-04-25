const sql = require('./mySQL')

sql.init('localhost', 3306, 'root', '1234')

sql.MySQLSelectCheck().then(async (dataObj) => {
    console.log(dataObj)
})
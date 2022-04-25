const mysql = require('mysql')
//const config = require('../config/config.json');

// console.log('hi')

// const mysql_connect = mysql.createConnection({
//     host: 'localhost',
//     user     : 'root',           // mysql user
//     password : '1234',       // mysql password
//     database: 'test'         // mysql 데이터베이스
// })

// mysql_connect.connect();

// mysql_connect.query('SELECT * From `Node-RED_table` ORDER BY `date` DESC', function (error, results, fields) {
//     if (error) throw error;
    
//     console.log('The solution is: ', results[0], results[1]);
//     console.log(results[0].date)
// });


// // dataObj = {key_0:0, val:2}
// // mysql_connect.query("INSERT INTO test.`API_table` SET ?",dataObj, function (error, resluts, fields) {
// //     if (error) throw error;
// // })

// mysql_connect.end();



var pool

exports.close=()=>{
    if(!pool) return;
    pool.end((err)=>{
        if(err) console.log(err)
    }); 
}

exports.init = function(_host,_port,_user,_password,_database)
{
    pool = mysql.createPool({
        host:_host, port:_port, user:_user, password:_password, database:_database
    })
}


exports.MySQLSelectCheck = async function () {
    return new Promise(async (resolve, reject) => {
        pool.getConnection(async (err, conn) => {
            if (err) {
                try {
                    conn.release()
                    reject(err)
                } catch {
                    reject(err)
                }
                return
            }

            try {
                await conn.query('SELECT * From test.`Node-RED_table` ORDER BY `date` DESC', function (error, results, fields) {
                    if (error) {
                        reject(err);
                    } 
                    else {
                        console.log('The solution is: ', results[0], results[1]);
                        resolve(results[0])
                    }
                })
            } catch (err) {
                reject(err)
            }
        })
    })
}
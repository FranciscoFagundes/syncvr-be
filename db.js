const mysql = require('mysql');

const conn = mysql.createPool({
    host: "your server",
    user: "your user",
    password: "your password",
    database: "your database"
});

conn.on('connection', function (_conn) {
    if (_conn) {
        console.log('Connected the database via threadId %d!!', _conn.threadId);
        _conn.query('SET SESSION auto_increment_increment=1');
    }
});

function getList() {
    try {
        let sql = 'SELECT * FROM log';
        return new Promise((resolve, reject) => {
            conn.query(sql, (err, result) => {
                if (err) throw err;
                resolve(JSON.parse(JSON.stringify(result)));
            });
        });
    } catch (error) {
        console.log(error);
    }

    console.log("teste")
}

async function addRequisition(fibonacciNumber, numberPosition, requisitionDate) {
    try {
        return await conn.query("INSERT INTO log (fibonacci_number, number_position, requisition_date) values  (" + "'" + fibonacciNumber + "','" + numberPosition + "','" + requisitionDate + "')");
    } catch (error) {
        console.log(error);
    }
}


module.exports = { getList, addRequisition }

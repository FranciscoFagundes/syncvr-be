async function connect() {
    if (global.connection && global.connection.state != 'disconnected')
        return global.connection;
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection("mysql://bfc91110e0c25b:583bfb0f@eu-cdbr-west-02.cleardb.net/heroku_eec4ae15216c394?reconnect=true");
    console.log("connected to database");
    global.connection = connection;
    return connection;
}


async function getList() {
    const conn = await connect();
    let query = 'SELECT * FROM log';

    return conn.query(query).then(([rows]) => {
        return rows;
    }).catch(error => {
        throw error;
    })
    conn.end();
}

async function addRequisition(fibonacciNumber, numberPosition, requisitionDate) {
    const conn = await connect();
    return await conn.query("INSERT INTO log (fibonacci_number, number_position, requisition_date) values  (" + "'" + fibonacciNumber + "','" + numberPosition + "','" + requisitionDate + "')");
}


module.exports = { connect, getList, addRequisition }
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'music',
    port: 3306,
});

connection.connect((err) => {
    if (err) {
        console.error('Kết nối MySQL thất bại:', err);
    } else {
        console.log('Đã kết nối tới MySQL');
    }
});

module.exports = connection;
const mysql = require('mysql2/promise');
const {logger} = require('./winston');

// TODO: 본인의 DB 계정 입력
const pool = mysql.createPool({
    host: 'carrot-db.ce39htg9fiye.us-east-2.rds.amazonaws.com',
    user: 'admin',
    port: '3306',
    password: 'a1s2d3f4',
    database: 'test',
    dateStrings: 'date'
});

module.exports = {
    pool: pool
};
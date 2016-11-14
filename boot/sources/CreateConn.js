/**
 * Created by mszz on 2016/11/4.
 */
const mysql = require("mysql");

module.exports = function () {
    var conn = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "us"
    });

    conn.connect1 = function () {
        return new Promise(function (resolve, reject) {
            conn.connect(function (err) {
                if (!err) {
                    resolve(conn);
                } else {
                    reject(err);
                }
            });
        });
    };

    conn.query1 = function (sql,values) {
        return new  Promise(function (resolve,reject) {
            conn.query(sql,values,function (err,rows) {
                if (!err) {
                    resolve(rows);
                } else {
                    reject(err);
                }
            })
        })
    }

    return conn;
}
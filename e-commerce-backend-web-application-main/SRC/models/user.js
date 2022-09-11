const sqlConnection = require("../services/sqlConnection");
const bcrypt = require("bcryptjs");
const auth = require('../utils/auth');
const { response } = require("express");

function signup(data, callback) {
    let sql = `INSERT INTO Users
               (Username, Password, CreatedAt, UpdatedAt)
               VALUES ( ? , ? , now(), now())
    `;
    let values = [];
    values.push(data.username);
    values.push(data.password);
    sqlConnection.executeQuery(sql, values, function (err, result) {
        callback(err, result);
    });
};

function strongSignup(data, callback) {
    let sql = `INSERT INTO Users
               (Username, Password, CreatedAt, UpdatedAt)
               VALUES ( ?, ?, now(), now())
               `;
    let values = [];
    values.push(data.username);
    bcrypt.hash(data.password, 8, function (err, hash) {
        if (err) {
            console.log(err);
            return;
        }
        values.push(hash);
        sqlConnection.executeQuery(sql, values, function (err, result) {
            callback(err, result);
        })
    })
};

function login(data, callback) {
    let sql = `SELECT ID as UserId, Username, Password, UserType
               FROM Users where
               Username = ?
    `;
    let values = [];
    values.push(data.username);
    sqlConnection.executeQuery(sql, values, function (err, result) {
        if (data.password == result[0].password) {
            callback(err, result);
        } else {
            callback(err, []);
        }
    });

};

function strongLogin(data, callback) {
    let sql = `SELECT ID as UserId, Username, Password
               FROM Users WHERE 
               Username = ?
               `;
    let values = [];
    values.push(data.username);
    sqlConnection.executeQuery(sql, values, function (err, result) {
        let isValid;
        if(result != undefined){
            isValid = bcrypt.compareSync(data.password, result[0].Password);
        
         }
          
        console.log(isValid);
        if (isValid) {
            const token = auth.newToken(result[0]);
            const response = [
                {
                    UserId: result[0].UserId,
                    Username: result[0].Username,
                    authToken: token
                }
            ];
            callback(err, response);
        } else {
            callback(err, []);
        }
    });
}

function getUsersSignupDetails(data, callback) {
    let sql = `SELECT ID as UserId, Username, UserType
               FROM Users WHERE
               Username = ? AND Password = ? 
    `;

    let values = [];
    values.push(data.username);
    values.push(data.password);
    sqlConnection.executeQuery(sql, values, function (err, result) {
        callback(err, result)
    });
}

function getUserById(id, callback) {
    let sql = `SELECT ID as UserId, Username
               FROM Users WHERE
               ID = ?
    `;
    let values = [id];
    sqlConnection.executeQuery(sql, values, function (err, result) {
        callback(err, result);
    })
}

module.exports = {
    signup,
    login,
    getUsersSignupDetails,
    strongSignup,
    strongLogin,
    getUserById
};
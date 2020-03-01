const db = require('../database');

class Account {
    static retrieveAll(callback) {
        db.query('SELECT email from account', function (err,res) {
            if (err.error){
                return callback(err);
            }
            callback(res);
        });
    }

    static insert(email, password, callback) {
        db.query('INSERT INTO account (email, password) VALUES ($1, $2)', [email,password], function (err,res) {
            if (err.error){
                return callback(err);
            }
            callback(res);
        });
    }
}

module.exports = Account;
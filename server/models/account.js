const db = require('../database');

class Account {
    //TODO: Get rid of these
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

    static getByEmail(email, password, callback){
        const text = 'SELECT * FROM account WHERE email=$1 AND password=$2';
        const values = [email, password];
        db.query(text, values, function(err,res) {
            if (err.error){
                console.log('err.error: ' + err.error);
                return callback(err);
            }
            callback(res);
        })
    }
}

module.exports = Account;
var express = require('express');
var Account = require('../models/account');
const db = require('../database');

var router = express.Router();
//Sorry about the commented out code, leaving it here until fully converted to async await
router.get('/', (req, res) => {
    // Account.retrieveAll(function(err,accounts){
    //     if(err){
    //         return res.json(err);
    //     }
    //     // return res.json(accounts)
    // })
    db.query('SELECT email from account', function (err,accounts) {
        if (err.error){
            return res.json(err);
        }
        console.log('db.query');
        console.log('accounts: ' + JSON.stringify(accounts));
        return res.json(accounts);
    });
});

router.get('/login', (req, res) => {
    let email = req.query.email;
    let password = req.query.password;
    // Account.getByEmail(email, password, function(err, accounts) {
    //     if (err){
    //         return res.json(err);
    //     }
    //     return res.json(acounts);
    // })

    const text = 'SELECT * FROM account WHERE email=$1 AND password=$2';
    const values = [email, password];
    db.query(text, values, function(err,response) {
        if (err.error){
            console.log('err.error: ' + err.error);
            return res.json(err);
        }
        console.log('response: ' + JSON.stringify(response));
        res.json(response);
    })
})

router.post('/', (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    Account.insert(email, password, (err, result)=> {
        if (err)
            return res.json(err);
        return res.json(result);
    })
});

module.exports = router;
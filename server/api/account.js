var express = require('express');
var Account = require('../models/account');

var router = express.Router();
router.get('/', (req, res) => {
    Account.retrieveAll(function(err,accounts){
        if(err){
            return res.json(err);
        }
        return res.json(accounts)
    })
});

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
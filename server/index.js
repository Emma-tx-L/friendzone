// const path = require('path');
const express = require('express');
const bodyParser = require('body-parser'); 

var db = require('./database');

// const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000; 

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api/account', require('./api/account'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

db.query('SELECT NOW()', (err, res) => {
    if (err.error){
        return console.log(err.error);
    }
    console.log(`Postgresql connected ${res[0].now}`)
})

module.exports = app;

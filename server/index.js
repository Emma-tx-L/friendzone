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
app.use('/api/event', require('./api/event'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

async function testDb() {
    try {
        const { rows } = await db.query('SELECT NOW()');
        console.log(`Postgresql connected ${rows[0].now}`);
    } catch(e){
        console.log('error: ' + e);
    }
}

testDb();

module.exports = app;

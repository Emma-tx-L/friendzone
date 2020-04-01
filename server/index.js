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
app.use('/api/chatcomment', require('./api/chatcomment'));
app.use('/api/review', require('./api/review'));


var server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

var io = require('socket.io')(server);

io.on('connection', (socket)=>{
    console.log('A user has connected');
    socket.on('JOIN_CHAT', chatid => {
        socket.join(chatid, () => {
            socket.on('CHAT_MESSAGE', (message) => {
                console.log('CHAT_MESSAGE received ' + JSON.stringify(message));
                io.in(message.chatid).emit("CHAT_MESSAGE", message);
            })
        })
    })
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

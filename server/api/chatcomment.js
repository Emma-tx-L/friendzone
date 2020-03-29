const db = require('../database');
const Router = require('express-promise-router');
const uuid = require('uuid');

var router = new Router();

router.get('/:id', async (req, res) => {
    let eventChatId = req.params.id;
    console.log('eventChatId: ' + eventChatId);
    const query = 
    `SELECT cm.content, cm.chatid, cm.profileid, cm.time, p.firstname
    FROM chatcomment cm, chat c, event e, profile p
    WHERE e.chatid=c.id AND cm.chatid = c.id AND cm.profileid = p.id
    AND e.chatid=$1 AND cm.chatid=$1 AND c.id=$1
    ORDER BY cm.time ASC`
    const values = [eventChatId];
    try {
        const { rows } = await db.query(query, values);
        console.log('ROWS: ' + JSON.stringify(rows));
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

router.post('/', async (req, res) => {
    let time = req.body.time;
    let content = req.body.content;
    let chatid = req.body.chatid;
    let profileid = req.body.profileid;
    const query = 
    `INSERT INTO chatcomment (time, content, chatid, profileid)
    VALUES ($1, $2, $3, $4)`
    const values = [time, content, chatid, profileid];
    try {
        const { rows } = await db.query(query, values);
        console.log('ROWS: ' + JSON.stringify(rows));
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})


module.exports = router;
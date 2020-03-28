const db = require('../database');
const Router = require('express-promise-router');

var router = new Router();

router.get('/:id', async (req, res) => {
    let eventChatId = req.params.id;
    console.log('eventChatId: ' + eventChatId);
    const query = 
    `SELECT cm.content, cm.chatid, cm.profileid, cm.time, p.firstname
    FROM chatcomment cm, chat c, event e, profile p
    WHERE e.chatid=c.id AND cm.chatid = c.id AND cm.profileid = p.id
    AND e.chatid=$1 AND cm.chatid=$1 AND c.id=$1`
    const values = [eventChatId];
    try {
        console.log('trying to get all chatcomments');
        const { rows } = await db.query(query, values);
        console.log('ROWS: ' + JSON.stringify(rows));
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

module.exports = router;
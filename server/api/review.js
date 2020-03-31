const db = require('../database');
const Router = require('express-promise-router');

var router = new Router();

router.get('/:id', async (req, res) => {
    let eventId = req.params.id;
    console.log('eventId: ' + eventId);
    const query = 
    `SELECT * 
    FROM review
    WHERE eventid=$1;`
    const values = [eventId];
    try {
        const { rows } = await db.query(query, values);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

// router.post('/', async (req, res) => {
//     let time = req.body.time;
//     let content = req.body.content;
//     let chatid = req.body.chatid;
//     let profileid = req.body.profileid;
//     const query = 
//     `INSERT INTO chatcomment (time, content, chatid, profileid)
//     VALUES ($1, $2, $3, $4)`
//     const values = [time, content, chatid, profileid];
//     try {
//         const { rows } = await db.query(query, values);
//         res.json(rows);
//     } catch(e){
//         console.log('error: ' + e);
//         return res.json(e);
//     }
// })

module.exports = router;
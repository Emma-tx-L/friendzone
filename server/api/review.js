const db = require('../database');
const Router = require('express-promise-router');

var router = new Router();

router.get('/:id', async (req, res) => {
    let eventId = req.params.id;
    const query = 
    `SELECT *
    FROM review
    WHERE eventid=$1`
    const values = [eventId];
    try {
        const { rows } = await db.query(query, values);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

router.get('/average/:id', async (req, res) => {
    let eventId = req.params.id;
    const query = 
    `SELECT AVG(rating)
    FROM review
    WHERE eventid=$1`
    const values = [eventId];
    try {
        const { rows } = await db.query(query, values);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

router.post('/', async (req, res) => {
    let id = req.body.id;
    let comment = req.body.comment;
    let rating = req.body.rating;
    let dateposted = req.body.dateposted;
    let eventid = req.body.eventid;
    const query = 
    `INSERT INTO review (id, comment, rating, dateposted, eventid)
    VALUES ($1, $2, $3, $4, $5)`
    const values = [id, comment, rating, dateposted, eventid];
    try {
        const { rows } = await db.query(query, values);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

module.exports = router;
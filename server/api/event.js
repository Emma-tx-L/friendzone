const db = require('../database');
const Router = require('express-promise-router');

var router = new Router();

router.get('/my-events', async (req, res) => {
    let profile = req.query.profile;
    const query = 
    `SELECT * FROM event e INNER JOIN
	    (SELECT p.id, r.EventID, r.isAdmin
        FROM 
            profile p 
            INNER JOIN registered r
            ON p.id = r.profileID
        WHERE
            p.id=$1) i
	ON e.ID=i.eventID`;
	
    const values = [profile];
    try {
        const { rows } = await db.query(query, values);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

router.get('/my-events/:id', async (req, res) => {
    let eventId = req.params.id;
    const query = 
    `SELECT * 
     FROM event
     WHERE id=$1;`;
    const values = [eventId];
    try {
        const { rows } = await db.query(query, values);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

/**
 * Returns all events of category, regardless of start or end time
 */
router.get('/:type', async (req, res) => {
    let activityType = req.params.type;
    const query = 
    `SELECT * 
     FROM event
     WHERE activitytype=$1;`;
    const values = [activityType];
    try {
        const { rows } = await db.query(query, values);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

/**
 * Returns all events of category that have not ended yet, based on current local time
 */
router.get('/upcoming/:type', async (req, res) => {
    let activityType = req.params.type;
    const query = 
    `SELECT * 
     FROM event
     WHERE activitytype=$1
        AND endtime>LOCALTIMESTAMP;`;
    const values = [activityType];
    try {
        const { rows } = await db.query(query, values);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

/**
 * Registers profile in event as non-admin
 */
router.get('/register/:eventID:profileID', async (req, res) => {
    let eventID = req.params.eventID;
    let profileID = req.params.profileID;
    const query = 
    `INSERT INTO Registered
        VALUES 
        ($1, $2, false)`
    const values = [profileID, eventID];
    try {
        const { rows } = await db.query(query, values);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

module.exports = router;
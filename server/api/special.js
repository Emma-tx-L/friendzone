const db = require('../database');
const Router = require('express-promise-router');
const { v4: uuidv4 } = require('uuid');

var router = new Router();

/**
 * Returns events with the highest average rating
 * NESTED AGGREGATION QUERY
 */
router.get('/highest-rated', async (req, res) => {
    const query = 
    `WITH r AS (SELECT AVG(rating) AS avg, EventID AS id
	FROM Review 
    GROUP BY EventID)
    
    SELECT * 
    FROM event
    WHERE
    id=
        (SELECT r.id
        FROM r
        WHERE
        r.avg = (SELECT MAX(r.avg) FROM r))`
    try {
        const { rows } = await db.query(query);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

/**
 * Returns upcoming events with the highest number of registrants
 * NESTED AGGREGATION QUERY
 */
router.get('/popular', async (req, res) => {
    const query = 
    `WITH c AS
        (SELECT COUNT(ProfileID), EventID
        FROM Registered
        GROUP BY EventID)
    
    SELECT *
    FROM Event
    WHERE ID=
        (SELECT c.EventID
        FROM c
        WHERE c.count=
        (SELECT MAX(count) FROM c)) AND endtime>LOCALTIMESTAMP`
    try {
        const { rows } = await db.query(query);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }   
})

/**
 * Returns events that are registered by every profile
 * DIVISION QUERY
 */
router.get('/all-registered', async (req, res) => {
    const query = 
    `SELECT * FROM event INNER JOIN
        (SELECT distinct eventid FROM registered AS r
            WHERE NOT EXISTS (
                (SELECT id FROM profile)
                EXCEPT
                (SELECT r2.profileid FROM registered as r2
                WHERE r2.eventid=r.eventid))) b
    ON event.id=b.eventid`
    try {
        const { rows } = await db.query(query);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }   
})

module.exports = router;
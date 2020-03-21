const db = require('../database');
const Router = require('express-promise-router');

var router = new Router();

router.get('/my-events', async (req, res) => {
    let profile = req.query.profile;
    console.log(profile);
    const query = 
    `SELECT * FROM event e INNER JOIN
	    (SELECT p.id, r.EventID
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

module.exports = router;
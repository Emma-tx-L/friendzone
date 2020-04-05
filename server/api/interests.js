const db = require('../database');
const Router = require('express-promise-router');

var router = new Router();

/**
 *  Gets all interests associated with a profile 
 */
router.get('/:id', async (req, res) => {
    let profileID = req.params.id;
    const query = 
    `SELECT * FROM interests WHERE profileid=$1`;
	
    const values = [profileID];
    try {
        const { rows } = await db.query(query, values);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

/**
 *  Helper to remove all interests associated with a profile
 */
async function removeAll(profileID){
    const query = `DELETE FROM interests WHERE profileid='${profileID}'`
    try {
        const { rows } = await db.query(query);
        return rows;
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
  }

/**
 *  Adds all interests associated with a profile 
 */
router.post('/set', async (req, res) => {
    const interests = req.body.data.interests;
    
    const profileID = req.body.data.profileID;
    const response = await removeAll(profileID);
    if (response && interests.length > 0){
        await Promise.all(interests.map(async (interest) => {
            const query = `INSERT INTO interests VALUES('${profileID}','${interest.type}','${interest.level}')`;
            try {
                const { rows } = await db.query(query);
                res.json(rows);
            } catch(e){
                console.log('error: ' + e);
                return res.json(e);
            }
          }));    
    }
    res.json(response);
});

module.exports = router;
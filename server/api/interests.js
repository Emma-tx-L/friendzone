const db = require('../database');
const Router = require('express-promise-router');

var router = new Router();

/**
 *  Gets interests associated with a profile 
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
 *  Adds an interest
 */
router.post('/set', async (req, res) => {
    const interest = req.body.data.interest;
    const profileID = req.body.data.profile;
    
    const checkExists = 
    `SELECT * FROM interests WHERE profileid='${profileID}' AND activitytype='${interest.type}' AND activitylevel='${interest.level}'`;
    const { rows } = await db.query(checkExists);
    if (rows.length === 0) {
        await setInterest(interest, profileID);
    }
})

/**
 *  Helper to add an interest
 */
async function setInterest(interest, profileID){
  const query = 
  `INSERT INTO interests VALUES('${profileID}','${interest.type}','${interest.level}')`;
  try {
      const { rows } = await db.query(query);
      res.json(rows);
  } catch(e){
      console.log('error: ' + e);
      return res.json(e);
  }
}

/**
 *  Removes an interest
 */
router.post('/remove', async (req, res) => {
  const interest = req.body.data.interest;
  const profileID = req.body.data.profile;
  
  const checkExists = 
  `SELECT * FROM interests WHERE profileid='${profileID}' AND activitytype='${interest.type}' AND activitylevel='${interest.level}'`;
  const { rows } = await db.query(checkExists);
  if (rows.length > 0) {
      await removeInterest(interest, profileID);
  }
})

/**
 *  Helper to remove an interest
 */
async function removeInterest(interest, profileID){
  const query = 
  `DELETE FROM interests WHERE profileid='${profileID}' AND activitytype='${interest.type}' AND activitylevel='${interest.level}')`;
  try {
      const { rows } = await db.query(query);
      res.status(200);
  } catch(e){
      console.log('error: ' + e);
      return res.json(e);
  }
}

module.exports = router;
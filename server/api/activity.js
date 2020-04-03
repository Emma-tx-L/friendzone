const db = require('../database');
const Router = require('express-promise-router');

var router = new Router();

/**
 *  Gets all activities and types 
 */
router.get('/', async (req, res) => {
    const query = `SELECT * FROM activity`;
    try {
        const { rows } = await db.query(query);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

module.exports = router;
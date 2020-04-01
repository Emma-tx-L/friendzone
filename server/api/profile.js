const db = require('../database');
const Router = require('express-promise-router');

var router = new Router();

router.get('/userprofile', async (req, res) => {
    let user = req.query.user;
    console.log(user);
    const query = 
    `SELECT * FROM profile p WHERE p.id=$1`;
	
    const values = [user];
    try {
        const { rows } = await db.query(query, values);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

module.exports = router;
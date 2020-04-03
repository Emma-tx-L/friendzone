const db = require('../database');
const Router = require('express-promise-router');

var router = new Router();

router.get('/:id', async (req, res) => {
    let userID = req.params.id;
    const query = 
    `SELECT * FROM profile p WHERE p.id=$1`;
	
    const values = [userID];
    try {
        const { rows } = await db.query(query, values);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

router.post('/set-profile', async (req, res) => {
    const profile = req.body.data.profile;
    const checkExists = 
    `SELECT * FROM profile WHERE id='${profile.id}'`;
    const { rows } = await db.query(checkExists);
    if (rows.length > 0) {
        await updateProfile(profile)
    }
    else {
        await createProfile(profile);
    }
})

async function updateProfile(profile){
    const query = `UPDATE profile SET email='${profile.email}', dob='${profile.dob}', firstname='${profile.firstname}', lastname='${profile.lastname}' WHERE id='${profile.id}'`;
    try {
        await db.query(query);
    } catch(e){
        console.log('error with update profile' + e);
    }
}

async function createProfile(profile){
    const query = `INSERT INTO profile VALUES('${profile.id}', '${profile.email}', '${profile.dob}', '${profile.firstname}', '${profile.lastname}')`;
    try {
        await db.query(query);
    } catch(e){
        console.log('error with create profile' + e);
    }
}

module.exports = router;
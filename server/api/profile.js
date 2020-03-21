const db = require('../database');
const Router = require('express-promise-router');

var router = new Router();

router.get('/', async (req, res) => {
    let email = req.query.email;

    const text = 'SELECT * FROM profile WHERE email=$1';
    const values = [email];
    try {
        const { rows } = await db.query(text, values);
        console.log(rows);
        res.json(rows);
    } catch(err){
        console.log('error: ' + err);
        return res.json(err);
    }
})

router.post('/', (req, res)=>{
    let email = req.body.email;
    let DOB = req.body.DOB;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    Profile.insert(email, DOB, firstName, lastName, (err, result)=> {
        if (err)
            return res.json(err);
        return res.json(result);
    })
});

module.exports = router;
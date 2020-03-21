const db = require('../database');
const Router = require('express-promise-router');

var router = new Router();

router.get('/', async (req, res) => {
    try {
        const { rows } = await db.query('SELECT email from account');
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(error);
    }
});

router.get('/login', async (req, res) => {
    let email = req.query.email;
    let password = req.query.password;

    const text = 'SELECT a.email, p.ID FROM account a LEFT JOIN profile p ON a.email=p.email WHERE a.email=$1 AND a.password=$2';
    const values = [email, password];
    try {
        const { rows } = await db.query(text, values);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
});

router.post('/', (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    Account.insert(email, password, (err, result)=> {
        if (err)
            return res.json(err);
        return res.json(result);
    })
});

module.exports = router;
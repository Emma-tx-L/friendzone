const db = require('../database');
const Router = require('express-promise-router');
const { v4: uuidv4 } = require('uuid');

var router = new Router();

async function setChat(id, eventName) {
    const query = `INSERT INTO chat VALUES('${id}', '${eventName}')`;
    try {
        await db.query(query);
    } catch(e){
        console.log('error with setchat' + e);
    }
}

async function setRegion(postalCode, province, city) {
    const checkExists = `SELECT * FROM region WHERE postalcode = '${postalCode}'`;
    const { rows } = await db.query(checkExists);
    if (rows.length === 0){
        const query = `INSERT INTO region VALUES('${postalCode}', '${province}', '${city}')`;
        try {
            await db.query(query);
        } catch(e){
            console.log('error setting region' + e);
        }
    }
}

async function setAddress(streetNumber, streetName, postalCode) {
    const checkExists = `SELECT * FROM address WHERE streetnumber =${streetNumber} AND streetname = '${streetName}' AND postalcode = '${postalCode}'`;
    const { rows } = await db.query(checkExists);
    if (rows.length === 0){
        const query = `INSERT INTO address VALUES(${streetNumber}, '${streetName}', '${postalCode}')`;
        try {
            await db.query(query);
        } catch(e){
            console.log('error setting address' + e);
        }
    }
}

async function updateChat(id, eventName) {
    const query = `UPDATE chat SET name='${eventName}' WHERE id='${id}'`
    try {
        await db.query(query);
    } catch(e){
        console.log('error with update chat' + e);
    }
}

async function registerEvent(profileID, eventID) {
    const query = `INSERT INTO registered VALUES('${profileID}', '${eventID}', true)`;
    try {
        await db.query(query);
    } catch(e){
        console.log('error registering event' + e);
    }
}


router.post('/create-event', async (req, res)=>{
    const chatID = uuidv4();
    const eventID = uuidv4();
    const profileID = req.body.data.profileID;
    let event = req.body.data.event;
    await setChat(chatID, event.eventName);
    await setRegion(event.postalCode, event.province, event.city);
    await setAddress(event.aptNumber, event.streetName, event.postalCode);
    const query = `INSERT INTO event VALUES('${eventID}', '${event.eventName}', '${event.startDate}', '${event.endDate}', '${event.description}', ${event.aptNumber}, '${event.streetName}', '${event.postalCode}', '${chatID}', '${event.activityType}', '${event.activityLevel}')`
    try {
        await db.query(query);
        await registerEvent(profileID, eventID);
        res.status(200);
    }
    catch(e) {
        console.log('error create event api' + e);
    } 
});

router.post('/update-event', async (req, res)=>{
    const eventID = req.body.data.eventID;
    let event = req.body.data.event;
    const chatID = event.chatID;
    await updateChat(chatID, event.eventName);
    await setRegion(event.postalCode, event.province, event.city);
    await setAddress(event.aptNumber, event.streetName, event.postalCode);

    const query =  `UPDATE event
	SET id='${eventID}', name='${event.eventName}', starttime='${event.startDate}', endtime='${event.endDate}', description='${event.description}', streetnumber=${event.aptNumber}, streetname='${event.streetName}', postalcode='${event.postalCode}', chatid='${chatID}', activitytype='${event.activityType}', activitylevel='${event.activityLevel}'
	WHERE id='${eventID}'`
    try {
        await db.query(query);
        res.status(200);
    }
    catch(e) {
        console.log('error update event api' + e);
    } 
});

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
        const postalcode = rows[0].postalcode;
        const region = await getRegion(postalcode);
        rows[0].city = region[0].city;
        rows[0].province = region[0].province;
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

async function getRegion(postalCode) {
    const query = `SELECT * FROM region WHERE postalcode = '${postalCode}'`;
    try {
        const { rows } = await db.query(query);
        return rows;
    } catch(e){
        console.log('error with get regions' + e);
    }
}

module.exports = router;
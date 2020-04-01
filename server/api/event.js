const db = require('../database');
const Router = require('express-promise-router');
const { v4: uuidv4 } = require('uuid');

var router = new Router();

/**
 * Helper to set chat associated with event
 */
async function setChat(id, eventName) {
    const query = `INSERT INTO chat VALUES('${id}', '${eventName}')`;
    try {
        await db.query(query);
    } catch(e){
        console.log('error with setchat' + e);
    }
}

/**
 * Helper to set region associated with event
 */
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

/**
 * Helper to set address associated with event
 */
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

/**
 * Helper to update chat associated with event
 */
async function updateChat(id, eventName) {
    const query = `UPDATE chat SET name='${eventName}' WHERE id='${id}'`
    try {
        await db.query(query);
    } catch(e){
        console.log('error with update chat' + e);
    }
}

/**
 * Helper to register event
 */
async function registerEvent(profileID, eventID) {
    const query = `INSERT INTO registered VALUES('${profileID}', '${eventID}', true)`;
    try {
        await db.query(query);
    } catch(e){
        console.log('error registering event' + e);
    }
}

/**
 *  Creates event
 */
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

/**
 * Updates event
 */
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

/**
 * Gets all events
 */
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

/**
 *  Gets specific event 
 */
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

/**
 *  Gets region associated with event
 */
async function getRegion(postalCode) {
    const query = `SELECT * FROM region WHERE postalcode = '${postalCode}'`;
    try {
        const { rows } = await db.query(query);
        return rows;
    } catch(e){
        console.log('error with get regions' + e);
    }
}

/**
 * Returns all events of category, regardless of start or end time
 */
router.get('/:type', async (req, res) => {
    let activityType = req.params.type;
    const query = 
    `SELECT * 
     FROM event
     WHERE activitytype=$1;`;
    const values = [activityType];
    try {
        const { rows } = await db.query(query, values);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

/**
 * Returns all events of category that have not ended yet, based on current local time
 */
router.get('/upcoming/:type', async (req, res) => {
    let activityType = req.params.type;
    const query = 
    `SELECT * 
     FROM event
     WHERE activitytype=$1
        AND endtime>LOCALTIMESTAMP;`;
    const values = [activityType];
    try {
        const { rows } = await db.query(query, values);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

/**
 * Registers profile in event as non-admin
 */
router.post('/register/', async (req, res) => {
    let eventID = req.body.eventID;
    let profileID = req.body.profileID;
    const query = 
    `INSERT INTO Registered
        VALUES 
        ($1, $2, false)`
    const values = [profileID, eventID];
    try {
        const { rows } = await db.query(query, values);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

/**
 * Deregisters event from profile
 */
router.post('/unregister/', async (req, res) => {
    let eventID = req.body.eventID;
    let profileID = req.body.profileID;
    const query = 
    `DELETE FROM Registered
        WHERE 
        ProfileID=$1 AND EventID=$2`
    const values = [profileID, eventID];
    try {
        const { rows } = await db.query(query, values);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }
})

/**
 * Returns events with the highest average rating
 * NESTED AGGREGATION QUERY
 */
router.get('/highest-rated', async (req, res) => {
    console.log("in");
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
        console.log(rows);
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
    const values = [];
    try {
        const { rows } = await db.query(query, values);
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
    `WITH a AS
    (SELECT *
    FROM
    event e INNER JOIN registered r ON e.id=r.eventid)

    SELECT * FROM event INNER JOIN
        (SELECT DISTINCT id FROM a
        WHERE NOT EXISTS (
            (SELECT id FROM profile)
            EXCEPT
            (SELECT a2.profileid FROM a as a2
            WHERE a2.id=a.id))) b
    ON event.id=b.id`
    const values = [];
    try {
        const { rows } = await db.query(query, values);
        res.json(rows);
    } catch(e){
        console.log('error: ' + e);
        return res.json(e);
    }   
})

module.exports = router;
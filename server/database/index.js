var { Pool } = require('pg');
const CONNECTION_STRING = process.env.DATABASE_URL || 'postgresql://postgres:aazhar@localhost:5432/friendzone';
const SSL = process.env.NODE_ENV === 'production'; 

class Database {
  constructor() {
    this._pool = new Pool({
      connectionString: CONNECTION_STRING,
      ssl: SSL
    });

    this._pool.on('error', (err, client) => {
      console.error('Unexpected error on idle PostgreSQL client.', err);
      process.exit(-1);
    });
  }

  async query(text, params) {
    const client = await this._pool.connect();
    try {
      let queryRes = await client.query(text, params);
      client.release();
      return queryRes;
    } catch (e){
      console.log('async query error');
      client.release();
      throw (e);
    }
  } 

  end () {
    this._pool.end();
  }
}

module.exports = new Database();
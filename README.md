# CPSC 304 Group Project 3
## FriendZone

### Installation
- Node from https://nodejs.org/en/
- Git https://git-scm.com/downloads
- PostgreSQL 12.2 (untick pgAdmin installation, we'll install this separately) https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
- pgAdmin February 2020 release https://www.pgadmin.org/download/pgadmin-4-windows/
- VS Code https://code.visualstudio.com/

### Locally
#### Client
- `cd client`
- `npm install` to install all dependencies 
- `npm start` to build & start the React app

#### Backend
- `npm install` in the root directory to install all dependencies
- `nodemon server` to start the Node.js server

#### Database Setup

- open `pgAdmin` -> `PostgreSQL 12` -> `Databases`
- Right click `Databases` and `Create` -> `Database`
- name it `'friendzone'` and the owner should be `'postgres'` (if you change this, then you'll have to change the database connection URI
- Our default database connection URI string is `postgresql://postgres:123456@localhost:5432/friendzone`, so ensure that the owner of the db is `postgres` and the password is `123456` or edit the database connection URI string to match your configurations;
- In pgAdmin, go to `Tools` -> `Query Tools` and paste the sql scripts in scripts folder to populate create/populate tables


### Misc
#### Tech Stack:
- Frontend: React (JavaScript)
- Backend/DB: NodeJS (Javascript), PostgreSQL
- The chat uses web sockets (socket.io) and optimistic ui updates! 

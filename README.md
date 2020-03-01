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
- Run this sql script to create account table`CREATE TABLE account(
	email VARCHAR(100) UNIQUE NOT NULL,
	password VARCHAR(100) NOT NULL,
	PRIMARY KEY(email)
)`

### Misc
- You'll notice most of the database functions use callback syntax, hoping to change this to async/await later.
- Because we're running local instances of the db, adding a table to the db means all of us has to add it, we should probably figure out all the schemas, have 1 person add it to the database, export the CREATE TABLE sqls and have the others just copy and paste it

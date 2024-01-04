import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import {handleIPAddressCountryAndCity} from './controllers/ipAddress.mjs';
import {totalUsersPerCountry} from './controllers/dbQueries.mjs';


const port = 3000;
const app = express();
app.use(cors());

// SQLite database setup
const db = new sqlite3.Database('./visitors.db');

// Create a table to store visitor data (IP address, country, city, timestamp)
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS Visitors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      ip TEXT,
      country TEXT,
      region Text,
      city TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  });

//Endpoints
app.get('/ipapi',(req,res) => {handleIPAddressCountryAndCity(req,res,db)});
app.get('/users-count', (req, res) => { totalUsersPerCountry(req,res,db)});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})
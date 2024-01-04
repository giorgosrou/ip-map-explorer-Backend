import express from 'express';
import cors from 'cors';
import pg from 'pg';
import {handleIPAddressCountryAndCity} from './controllers/ipAddress.mjs';
import {totalUsersPerCountry} from './controllers/dbQueries.mjs';

const port = 3000;
const app = express();
app.use(cors());

// PostgreSQL configuration
const db = new pg.Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'ip-map-explorer',
  password: 'test',
  port: 5432,
});

//Endpoints
app.get('/ipapi',(req,res) => {handleIPAddressCountryAndCity(req,res,db)});
app.get('/users-count', (req, res) => { totalUsersPerCountry(req,res,db)});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})
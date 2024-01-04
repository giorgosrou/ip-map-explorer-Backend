import express from 'express';
import cors from 'cors';
import pg from 'pg';
import {handleIPAddressCountryAndCity} from './controllers/ipAddress.mjs';
import {totalUsersPerCountry} from './controllers/dbQueries.mjs';

const port = 3000;
const app = express();
app.set('trust proxy', true);
app.use(cors());

// PostgreSQL configuration
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_DB,
  password: process.env.DATABASE_PW,
  port: 5432,
});

//Endpoints
app.get('/ipapi',(req,res) => {handleIPAddressCountryAndCity(req,res,db)});
app.get('/users-count', (req, res) => { totalUsersPerCountry(req,res,db)});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})
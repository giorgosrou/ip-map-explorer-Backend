import express from 'express';
import cors from 'cors'
import {findIPAddress, handleIPAddressCountryAndCity} from './controllers/ipAddress.mjs'

const port = 3000;
const app = express();
app.use(cors());

app.get('/getip', (req, res) => {findIPAddress(req,res);});
app.get('/ipapi',(req,res) => {handleIPAddressCountryAndCity(req,res)});

app.listen(port, () => {
    console.log(`app is running on port ${port}`);
})
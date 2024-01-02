import fetch from 'node-fetch';

// retrieve IP address from api.ipify api - Not used since ip-api is used instead
const findIPAddress = (req,res) => {
  try {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        const { ip } = data;
        res.json({ ip });
      })
  } catch(error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

//Retrieve IP address, country and city from ip-api
const handleIPAddressCountryAndCity = (req,res) => {
  try {
    fetch('http://ip-api.com/json/?fields=61439')
      .then((response) => response.json())
      .then((data) => {console.log(data);
        res.json(data);
      })
  } catch(error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

export { findIPAddress, handleIPAddressCountryAndCity };
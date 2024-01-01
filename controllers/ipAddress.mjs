import fetch from 'node-fetch';

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

export { findIPAddress };
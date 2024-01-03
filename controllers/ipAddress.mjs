import fetch from 'node-fetch';

//Retrieve IP address, country and city from ip-api
const handleIPAddressCountryAndCity = (req, res, db) => {
  fetch('http://ip-api.com/json/?fields=61439')
    .then((response) => response.json())
    .then((data) => {
      // Check if the IP exists in the database
      db.get('SELECT * FROM Visitors WHERE ip = ?', [data.query], (err, row) => {
        if (err) {
          res.status(500).json({ error: 'Failed to check visitor information' });
        } else if (row) {
          // If IP exists, update the timestamp
          db.run('UPDATE Visitors SET timestamp = CURRENT_TIMESTAMP WHERE ip = ?', [data.query], (err) => {
            if (err) {
              res.status(500).json({ error: 'Failed to update timestamp' });
            } else {
              res.json(data);
            }
          });
        } else {
          // If IP doesn't exist, insert new record
          db.run('INSERT INTO Visitors (ip, country, city, region) VALUES (?, ?, ?, ?)', [data.query, data.country, data.city, data.regionName], (err) => {
            if (err) {
              res.status(500).json({ error: 'Failed to store visitor information' });
            } else {
              res.json(data);
            }
          });
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });
};


export { handleIPAddressCountryAndCity };
import fetch from 'node-fetch';

const handleIPAddressCountryAndCity = (req, res, db) => {
  const userIP = req.ip;
  console.log(userIP);
  console.log(`http://ip-api.com/json/${userIP}`)
  fetch(`http://ip-api.com/json/${userIP}`)
    .then((response) => response.json())
    .then((data) => {
      // Check if the IP exists in the database
      db.query('SELECT * FROM Visitors WHERE ip = $1', [data.query], (err, result) => {
        if (err) {
          res.status(500).json({ error: 'Failed to check visitor information' });
        } else if (result.rows.length > 0) {
          // If IP exists, update the timestamp
          db.query('UPDATE Visitors SET timestamp = CURRENT_TIMESTAMP WHERE ip = $1', [data.query], (err) => {
            if (err) {
              res.status(500).json({ error: 'Failed to update timestamp' });
            } else {
              res.json(data);
            }
          });
        } else {
          // If IP doesn't exist, insert new record
          db.query(
            'INSERT INTO Visitors (ip, country, city, region) VALUES ($1, $2, $3, $4)',
            [data.query, data.country, data.city, data.regionName],
            (err) => {
              if (err) {
                res.status(500).json({ error: 'Failed to store visitor information' });
              } else {
                res.json(data);
              }
            }
          );
        }
      });
    })
    .catch((error) => {
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

export { handleIPAddressCountryAndCity };
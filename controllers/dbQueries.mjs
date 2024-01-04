// Query the total users for a specific country
const totalUsersPerCountry = (req, res, db) => {
    const { country } = req.query;
    if (!country) {
      return res.status(400).json({ error: 'Country parameter is required' });
    }
    // Fetch total users for the specified country from the database
    db.get('SELECT COUNT(*) AS totalUsers FROM Visitors WHERE country COLLATE NOCASE = ?', [country], (err, row) => {
      if (err) {
        console.error('Error fetching total users:', err);
        res.status(500).json({ error: 'Failed to retrieve total users' });
      } else {
        const totalUsers = row ? row.totalUsers : 0;
        res.json({ totalUsers });
      }
    });
}

export { totalUsersPerCountry };
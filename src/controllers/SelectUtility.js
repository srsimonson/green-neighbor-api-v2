const db = require('../db');

const getUtilitiesQuery = db.prepare(`
  SELECT gpp.*
  FROM utilities_by_zip zu
    JOIN gpp_details gpp ON gpp.eia_state = zu.eia_state
  WHERE zu.zip = ?`);

const getUtilities = async (req, res) => {
  const rows = getUtilitiesQuery.all(req.params.zip);
  res.send(rows);
};

module.exports = {
  getUtilities,
};

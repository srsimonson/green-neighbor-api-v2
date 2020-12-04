const db = require('../db');

// object schema: {
//   name, zip, eiaid, eia_state, programs: [...programs]
// }
const getUtilities = async (req, res) => {
  const rows = db.prepare(`
    SELECT gpp.*, ua.alias1, ua.alias2
    FROM utilities_by_zip zu
      LEFT JOIN gpp_details gpp ON gpp.eia_state = zu.eia_state
      JOIN utility_aliases ua ON ua.eia_state = gpp.eia_state
    WHERE gpp.production = 1
      AND zu.zip = ?`).all(req.params.zip);

  const utilities = [];
  for (const row of rows) {
    const utility = utilities.find((u) => u.eia_state === row.eia_state);
    if (utility) {
      utility.programs.push(row);
    } else {
      utilities.push({
        name: row.name,
        zip: row.zip,
        eiaid: row.eiaid,
        eia_state: row.eia_state,
        programs: [row],
      });
    }
  }

  res.send(utilities);
};

module.exports = {
  getUtilities,
};

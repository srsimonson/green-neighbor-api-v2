const router = require('express').Router();
const db = require('../db');

// object schema: {
//   name, aliases: [], zip, eiaid, eia_state, programs: [...programs]
// }
router.get('/:zip', async (req, res) => {
  const rows = db.prepare(`
    SELECT gpp.*,
      ua.alias1 AS utility_alias1,
      ua.alias2 AS utility_alias2
    FROM utility zu
      LEFT JOIN gpp_detail gpp ON gpp.eia_state = zu.eia_state
      LEFT JOIN utility_alias ua ON ua.eia_state = gpp.eia_state
    WHERE gpp.production = 1
      AND zu.zip = ?`).all(req.params.zip);

  const utilities = [];

  // For each program, check if utility object exists.
  // If not, make one. Add row to utility object "programs" array.
  for (const row of rows) {
    let utility = utilities.find((u) => u.eia_state === row.eia_state);

    if (!utility) {
      utilities.push({
        name: row.utility_name,
        aliases: [row.alias1, row.alias2],
        zip: row.zip,
        eiaid: row.eiaid,
        eia_state: row.eia_state,
        programs: [],
      });

      utility = utilities[utilities.length - 1];
    }
    // Yes, each program currently contains all the data from
    // the utility object, but this can be useful
    utility.programs.push(row);
  }

  res.send(utilities);
});

module.exports = router;

const db = require('../../db');
const logger = require('../../logger');

// column map object, see gppColumnMap for example
module.exports = async (doc, { sheetTitle, dbTableName: tableName, columns: columnMap }) => {
  logger.debug(`\tBuilding table ${tableName}`);

  const sheet = doc.sheetsByTitle[sheetTitle];
  const rows = await sheet.getRows();
  const sheetColumns = Object.keys(rows[0]).filter((k) => columnMap[k.trim()]);
  const dbColumns = sheetColumns.map((col) => columnMap[col].name);

  (db.transaction(() => {
    db.prepare(`DROP TABLE IF EXISTS ${tableName}`).run();

    db.prepare(`
      CREATE TABLE ${tableName} (
        ${tableName}_pk INTEGER PRIMARY KEY,
        ${sheetColumns.map((col) => `${columnMap[col].name} ${columnMap[col].type} DEFAULT NULL`).join(',')}
      )
    `).run();

    const insert = db.prepare(`
        INSERT INTO ${tableName} (${dbColumns})
        VALUES (${Array.from(dbColumns, () => '?')})
    `);

    // This bit actually needs to be fast
    for (let i = 0; i < rows.length; i += 1) {
      const values = sheetColumns.map((k) => {
        const val = (rows[i][k] ? rows[i][k].trim() : null);
        if (val === '' || val === null) return null;
        return val;
      });
      insert.run(...values);
    }
    logger.debug(`\tFinished building table ${tableName}`);
  }))();
};

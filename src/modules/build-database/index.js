require('dotenv').config();
const getGoogleDoc = require('../getGoogleDoc');
const generateTable = require('./generateTable');
const columnMaps = require('./column-maps');
const db = require('../../db');
const { IS_DEV } = require('../../constants');
const logger = require('../../logger');

const checkIfDbExists = () => db.prepare(
  `SELECT count(*) FROM sqlite_master
    WHERE type='table'
      AND name IN (${columnMaps.map((t) => `'${t.dbTableName}'`).join(',')})`,
).pluck().get() === columnMaps.length;

// Currently, we generate the DB based on what exists in
// the GNC research google sheets. These are read into a
// Sqlite DB with columns renamed, as is shown in the
// <table>ColumnMap.json files in column-maps
const buildDatabase = async () => {
  logger.debug('Building database...');
  const doc = await getGoogleDoc();

  // if in dev mode, we don't want to rebuild the
  // db each time, so don't build it if it exists
  if (IS_DEV && checkIfDbExists()) {
    logger.debug('Build skipped: using existing database');
    return;
  }

  await Promise.all(columnMaps.map((columnMap) => generateTable(doc, columnMap)));
  logger.debug('Finished building database!');
};

module.exports = buildDatabase;

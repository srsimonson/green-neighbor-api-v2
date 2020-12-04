const Database = require('better-sqlite3');
const { IS_DEV } = require('./constants');

const databaseFile = IS_DEV ? 'gnc-dev.db' : ':memory:';

module.exports = new Database(databaseFile);

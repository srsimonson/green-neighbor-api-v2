const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const logger = require('./logger.js');
const buildDatabase = require('./modules/buildDatabase');
const selectUtilityRouter = require('./routes/SelectUtility');

(async () => {
  await buildDatabase();

  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const PORT = process.env.PORT || 5000;

  app.use('/api/SelectUtility', selectUtilityRouter);

  app.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}`);
  });
})();

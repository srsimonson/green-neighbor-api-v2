const express = require('express');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const logger = require('./logger.js');
const buildDatabase = require('./modules/build-database');
const selectUtilityRouter = require('./features/green-pricing');

(async () => {
  await buildDatabase();

  const app = express();

  // URLs to accept requests from
  app.use(cors({
    origin: '*', // TODO: Update this when we have prod url
  }));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  const PORT = process.env.PORT || 5000;

  app.use('/api/GreenPricing', selectUtilityRouter);

  app.listen(PORT, () => {
    logger.info(`Listening on port ${PORT}`);
  });
})();

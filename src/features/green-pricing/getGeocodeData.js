const axios = require('axios').default;
const logger = require('../../logger');

module.exports = async (req, res) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json'
      + `?address=${req.params.zip}&sensor=true&key=${process.env.GOOGLE_API_KEY}`);

    const { data } = response;

    if (data.results[0]) {
      res.send({ address: data.results[0].formatted_address });
    } else {
      res.sendStatus(500);
    }
  } catch (e) {
    logger.error(e.message);
    res.status(400).json(e);
  }
};

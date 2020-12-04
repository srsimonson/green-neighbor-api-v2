const { GoogleSpreadsheet } = require('google-spreadsheet');

const SHEET_ID = '1udOHaw-_Kzw-Y4Mox-hQTVSuf4fZZ1iTFcXG39uOBxU';

const getGoogleDoc = async () => {
  if (getGoogleDoc.cachedDoc) {
    return getGoogleDoc.cachedDoc;
  }

  const doc = new GoogleSpreadsheet(SHEET_ID);

  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
  });

  await doc.loadInfo();

  getGoogleDoc.cachedDoc = doc;
  return doc;
};

module.exports = getGoogleDoc;

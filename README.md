# Green Neighbor API V2

That's right, we're reduxing the Green Neighbor Challenge's web tool API.

This project aims to implement vertical slice architecture, where each feature hooks to a single code path from front to back. Try to keep the `modules` folder minimal.

Currently, this pulls data from the research google sheets and moves them into a Sqlite database. The code to do this is kind of hack-y right now so revamp it if you're bored. Columns in the google sheets aren't exactly code-friendly, so they are renamed based on the JSON objects in `src/modules/build-database/column-maps`. This is implemented using [better-sqlite](https://github.com/JoshuaWise/better-sqlite3).

# Setup

You'll need to set the GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY variables in `.env` before running `npm i`. You can get these from David or whoever is maintaining the project at the time.

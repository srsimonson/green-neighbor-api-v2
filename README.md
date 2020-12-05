# Green Neighbor API V2

That's right, we're reduxing the Green Neighbor Challenge's web tool API. This is currently used as the backend for the green-neighbor-ui-v2 project, but may be used for other things in the future too.

Currently, this pulls data from the research google sheets and moves them into a Sqlite database. The code to do this is kind of hack-y right now so revamp it if you're bored. Columns in the google sheets aren't exactly code-friendly, so they are renamed based on the JSON objects in `src/modules/build-database/column-maps`. This is implemented using [better-sqlite](https://github.com/JoshuaWise/better-sqlite3).

# Setup

You'll need to set the GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY variables in `.env` before running `npm i`. You can get these from David or whoever is maintaining the project at the time.

# Coding guidelines
## These are fallible. If you have ideas on doing things better, bring them up.

You might notice I have typescript set up. You don't need to use it if you don't want, I have implemented it on a couple endpoints because some of these tables have a ridiculous number of rows, and it helps me keep track of them.

This project generally follows the Airbnb ESLint guidelines, with a few rules softened. This project does not use a transpiler, so use whatever JavaScript is currently implemented on Node (current: 12.18.3).

Filenames should use the following scheme:
  - `camelCase` for modules which export functions
  - `PascalCase` for modules exporting classes or constructors
  - `kebab-case` for normal object exports.

In the database, tables should always use `snake_case`, and be named in the singular (i.e. `gpp_detail` rather than `gpp_details`). All primary keys should be named `<table-name>_pk`, and all tables should have primary keys. You never know when you'll need em.

Functional programming patterns are encouraged but not required.

Files should be organized by domain (or "features", as they are called here), which should tie directly to a correlated feature on the frontend when possible, and be named as such when that is the case. Additionally, sharing code between domains is strongly discouraged, aside from instances of practical logic which is not specific to a piece of domain (i.e. an array flattener, or something else you would normally grab from npm exept npm doesn't have it).
const { DATABASE_SCHEMA, DATABASE_URL } = require('../../env');
const massive = require('massive');

async function connectToDatabase() {
  const db = await massive(
    {
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    {
      // Massive Configuration
      scripts: process.cwd() + '/migration',
      allowedSchemas: [DATABASE_SCHEMA],
      whitelist: [`${DATABASE_SCHEMA}.%`],
      excludeFunctions: true,
    },
    {
      // Driver Configuration
      noWarnings: true,
      error: function (err, client) {
        console.log(err);
        //process.emit('uncaughtException', err);
        //throw err;
      },
    }
  );

  return db;
}

module.exports = connectToDatabase;

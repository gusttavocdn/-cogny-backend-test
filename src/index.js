const { SHOW_PG_MONITOR } = require('../env');
const connectToDatabase = require('./database/config');
const migrationUp = require('./database/migrationUp');
const monitor = require('pg-monitor');
const waitAndExecute = require('./utils/waitAndExecute');
const menu = require('./menu');

async function main() {
  console.log('main.js: before start');

  const db = await connectToDatabase();

  if (!monitor.isAttached() && SHOW_PG_MONITOR === 'true') {
    monitor.attach(db.driverConfig);
  }

  //public
  try {
    await migrationUp(db);
  } catch (e) {
    console.log(e.message);
  } finally {
    waitAndExecute(1, menu);
  }
}

main();

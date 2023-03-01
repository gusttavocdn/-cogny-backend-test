const { DATABASE_SCHEMA } = require('../../env');

const execFileSql = async (db, schema, type) => {
  return new Promise(async (resolve) => {
    const objects = db['user'][type];

    if (objects) {
      for (const [key, func] of Object.entries(objects)) {
        console.log(`executing ${schema} ${type} ${key}...`);
        await func({
          schema: DATABASE_SCHEMA,
        });
      }
    }

    resolve();
  });
};

const migrationUp = async (db) => {
  return new Promise(async (resolve) => {
    await execFileSql(db, DATABASE_SCHEMA, 'schema');

    //cria as estruturas necessarias no db (schema)
    await execFileSql(db, DATABASE_SCHEMA, 'table');
    await execFileSql(db, DATABASE_SCHEMA, 'view');

    console.log(`reload schemas ...`);
    await db.reload();

    resolve();
  });
};

module.exports = migrationUp;

const DataProvider = require('./DataProvider');
const connectToDatabase = require('require./database/config');
const { DATABASE_SCHEMA } = require('../env');

class Repository {
  #dataProvider;

  constructor() {
    this.#dataProvider = new DataProvider();
  }

  async addDataOnDB() {
    const db = await connectToDatabase();
    const data = await this.#dataProvider.execute();
    console.log(data);

    await db[DATABASE_SCHEMA].api_data.save({
      doc_record: { data },
    });

    console.log('Data saved on DB');
  }
}

module.exports = Repository;

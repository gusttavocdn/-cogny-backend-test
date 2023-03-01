const connectToDatabase = require('../database/config');
const { DATABASE_SCHEMA } = require('../../env');
const readlineAsync = require('../utils/readline');
const axios = require('axios');

class Repository {
  static dataCalls = 0;

  async #getData() {
    const response = await axios.get(
      'https://datausa.io/api/data?drilldowns=Nation&measures=Population'
    );

    const { data } = response.data;
    return data;
  }

  async #ensureThatUserWantsToSaveDataAgain() {
    if (Repository.dataCalls == 0) return true;

    const option = await readlineAsync('Y/N:');

    switch (option) {
      case 'Y':
        return true;
      case 'N':
        return false;
      default:
        console.log('Invalid option');
    }
  }

  async addDataOnDB() {
    const shouldSaveData = await this.#ensureThatUserWantsToSaveDataAgain();

    if (!shouldSaveData) {
      console.log('Data already exists on DB');
      return;
    }

    const db = await connectToDatabase();
    const data = await this.#getData();

    await db[DATABASE_SCHEMA].api_data.save({
      doc_record: { data },
    });

    Repository.dataCalls++;
  }

  async getDataFromDB() {
    const db = await connectToDatabase();
    const { doc_record } = await db[DATABASE_SCHEMA].api_data.findOne({});
    return doc_record.data;
  }

  async getSumPopulation(startYear, endYear) {
    const db = await connectToDatabase();
    const data = await db.query(
      `SELECT SUM((item->>'Population')::int) 
      FROM ${DATABASE_SCHEMA}.api_data, jsonb_array_elements(doc_record->'data') AS item
      WHERE (item->>'Year')::int BETWEEN ${startYear} AND ${endYear};`
    );

    return data[0];
  }
}

module.exports = Repository;

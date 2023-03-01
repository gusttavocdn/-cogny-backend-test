const connectToDatabase = require('../database/config');
const { DATABASE_SCHEMA } = require('../../env');
const readline = require('../utils/readline');
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

  #ensureThatUserWantsToSaveDataAgain() {
    if (Repository.dataCalls == 0) return true;

    readline.question('Y/N: ', (option) => {
      switch (option) {
        case 'Y':
          return true;
        case 'N':
          return false;
        default:
          console.log('Invalid option');
      }
      readline.close();
    });
  }

  async addDataOnDB() {
    const shouldSaveData = this.#ensureThatUserWantsToSaveDataAgain();

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

    console.log('Data saved on DB');
  }

  async getDataFromDB() {
    const db = await connectToDatabase();
    const { doc_record } = await db[DATABASE_SCHEMA].api_data.findDoc(2);
    return doc_record.data;
  }

  async getSumPopulation() {
    const db = await connectToDatabase();
    const data = await db.query(
      `SELECT SUM((item->>'Population')::int) 
      FROM ${DATABASE_SCHEMA}.api_data, jsonb_array_elements(doc_record->'data') AS item
      WHERE (item->>'Year')::int BETWEEN 2018 AND 2020;`
    );

    return data[0];
  }
}

module.exports = Repository;

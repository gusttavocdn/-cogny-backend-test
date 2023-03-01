const axios = require('axios');

class DataProvider {
  async execute() {
    const response = await axios.get(
      'https://datausa.io/api/data?drilldowns=Nation&measures=Population'
    );

    const { data } = response.data;
    return data;
  }
}
module.exports = DataProvider;

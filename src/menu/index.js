const Repository = require('../repositories/Repository');
const readlineAsync = require('../utils/readline');
const waitAndExecute = require('../utils/waitAndExecute');
const {
  exit,
  sumPopulationWithHofs,
  sumPopulationWithQuery,
  sumPopulationBetweenAGivenRangeOfYears,
} = require('./options');

async function menu() {
  console.clear();
  console.log(`-------------------------------`);
  console.log('Welcome to the Menu!');
  console.log(`-------------------------------`);

  console.log('\nSelect one of the options below: ');
  console.log('\n 0 - exit the application');
  console.log(' 1 - retrieve the data on the database');
  console.log(' 2 - sum the population from 2018 to 2020');
  console.log(' 3 - sum the population from 2018 to 2020 with query');
  console.log(' 4 - sum the population from a given range of years');

  const option = await readlineAsync('\nOption: ');

  switch (option) {
    case '0':
      console.log('\nExiting the application...');
      await waitAndExecute(1, exit);
      break;
    case '1':
      const repository = new Repository();
      await repository.addDataOnDB();
      waitAndExecute(1, menu);
      break;
    case '2':
      await sumPopulationWithHofs();
      await waitAndExecute(5, exit);
      break;
    case '3':
      await sumPopulationWithQuery();
      await waitAndExecute(5, exit);
      break;
    case '4':
      await sumPopulationBetweenAGivenRangeOfYears();
      await waitAndExecute(5, exit);
      break;
    default:
      console.log('\nInvalid option chosen. Exiting the application...');
      waitAndExecute(1, exit);
      break;
  }
}

module.exports = menu;

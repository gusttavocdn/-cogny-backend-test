const Repository = require('../repositories/Repository');
const readlineAsync = require('../utils/readline');

function exit() {
  console.log('Exiting the application...');
  setTimeout(() => {
    process.exit(0);
  }, 1000);
}

async function addDataOnDatabase() {
  const repository = new Repository();
  await repository.addDataOnDB();

  console.log('Data saved on DB');
}

async function sumPopulationWithHofs() {
  console.clear();
  console.log('Calculating...\n');

  const respository = new Repository();
  const data = await respository.getDataFromDB();

  const population = data.reduce((acc, curr) => {
    if (curr.Year < 2018 || curr.Year > 2020) return acc;
    return acc + Number(curr.Population);
  }, 0);

  console.log(
    `The population sum between the years 2018 to 2020 are: ${population}`
  );
}

async function sumPopulationWithQuery(startYear = 2018, endYear = 2020) {
  console.clear();
  console.log('Calculating...\n');

  const respository = new Repository();
  const { sum: population } = await respository.getSumPopulation(
    startYear,
    endYear
  );

  console.log(
    `The population sum between the years ${startYear} to ${endYear} are: ${population}`
  );
}

async function sumPopulationBetweenAGivenRangeOfYears() {
  const startYear = await readlineAsync('Start year: ');
  const endYear = await readlineAsync('End year: ');

  if (
    Number(startYear) > Number(endYear) ||
    isNaN(startYear) ||
    isNaN(endYear)
  ) {
    console.log('Invalid range of years. Try again');
    return sumPopulationBetweenAGivenRangeOfYears();
  }

  await sumPopulationWithQuery(startYear, endYear);
}

module.exports = {
  exit,
  sumPopulationWithHofs,
  sumPopulationWithQuery,
  sumPopulationBetweenAGivenRangeOfYears,
  addDataOnDatabase,
};

const Repository = require('../repositories/Repository');

function exit() {
  process.exit(0);
}

async function SumPopulationWithHofs() {
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

module.exports = { exit, SumPopulationWithHofs };

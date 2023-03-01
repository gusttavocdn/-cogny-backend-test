const Repository = require('./repositories/Repository');
const readline = require('./utils/readline');
const waitAndExecute = require('./utils/waitAndExecute');

function exit() {
  process.exit(1);
}

function menu() {
  console.clear();
  console.log(`-------------------------------`);
  console.log('Welcome to the Menu!');
  console.log(`-------------------------------`);

  console.log('\nSelect one of the options below: ');
  console.log('\n 0 - exit the application');
  console.log(' 1 - retrieve the data on the database');

  readline.question('\nYour option: ', (option) => {
    switch (option) {
      case '0':
        console.log('\nExiting the application...');
        waitAndExecute(1, exit);
        break;
      case '1':
        const repository = new Repository();
        repository.addDataOnDB();
        waitAndExecute(1, menu);
        break;
      default:
        console.log('\nInvalid option chosen. Exiting the application...');
        waitAndExecute(1, exit);
        break;
    }

    readline.close();
  });
}

module.exports = menu;

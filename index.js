const config = require('./knexfile').development;
const database = require('knex')(config);
const inquirer = require('inquirer');

async function app() {
  // Loop until break, process.exit, or return
  while (true) {
    const accounts = await database.select().from('accounts');

    const action = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: 'What do you want to do?',
        choices: [
          { name: 'Create Account', value: 'ACCOUNT@CREATE' },
          { name: 'That is all', value: 'EXIT' }
        ]
      }
    ]);

    switch (action.type) {
      case 'EXIT':
        // The thing that quits
        process.exit();
      case 'ACCOUNT@CREATE':
        const userData = await inquirer.prompt([
          { type: 'input', name: 'first_name', message: 'First Name:' },
          { type: 'input', name: 'last_name', message: 'Last Name:' },
          { type: 'input', name: 'balance', message: 'Account Balance:' },
        ]);

        await database.insert(userData).into('accounts');
        console.log('You have created an account!');
    }
  }
}

app();

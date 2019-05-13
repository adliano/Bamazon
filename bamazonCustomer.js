// http://www.mysqltutorial.org/
// https://www.npmjs.com/package/inquirer#examples

let ListProducts = require('./ListProducts');

let inquirer = require('inquirer');

inquirer.prompt([
    {
        type: 'list',
        message : 'What do you like to do?',
        choices: ['option a','option b'],
        name: 'todo'
    }
]).then((answer) =>{
    console.log(answer);
    new ListProducts();
});
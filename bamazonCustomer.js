// http://www.mysqltutorial.org/
// https://www.npmjs.com/package/inquirer#examples
/**
 * Running this application will first display all of 
 * the items available for sale. Include the skus, names,
 * and prices of products for sale.
 */


 // SKU of the product they would like to buy
let ListProducts = require('./ListProducts');

let inquirer = require('inquirer');

new ListProducts()

inquirer.prompt([
    {
        type: 'list',
        message : 'What do you like to do?',
        choices: ['option a','option b'],
        name: 'todo'
    }
]).then((answer) =>{
    // TODO: 
    console.log(answer);
    
});
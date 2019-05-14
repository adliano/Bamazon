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


function sales() {
    // The first should ask them the SKU of the product they would like to buy
    inquirer.prompt([{
        type: 'input',
        message: 'What do you like to buy?',
        name: 'todo'
    }]).then((answer) => {
        console.log(answer);

    });
}

new ListProducts(sales);
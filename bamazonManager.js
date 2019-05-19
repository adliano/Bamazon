// * List a set of menu options:
// * View Products for Sale
// * View Low Inventory
// * Add to Inventory
// * Add New Product
// * If a manager selects `View Products for Sale`,
//   the app should list every available item: the item SKUs, names, prices, and quantities.
// * If a manager selects `View Low Inventory`,
//   then it should list all items with an inventory count lower than five.
// * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

let inquirer = require("inquirer");
let ListProducts = require("./lib/ListProducts");
let ManagerProducts = require("./lib/ManagerProducts");
const print = require("print-message");

inquirer
  .prompt([
    {
      type: "list",
      // List a set of menu options:
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ],
      message: "Options:",
      name: "option"
    }
  ])
  .then(opt => {
    let lp = new ListProducts();
    switch (opt.option) {
      case "View Products for Sale":
        lp.listInventory();
        break;
      case "View Low Inventory":
        lp.listInventory(5)
          .then(result => {
            if (result.length < 1) {
              print(["No Product with Low inventory"]);
            }
          })
          .catch(err => console.error(err));
        break;
      case "Add to Inventory":
        new ManagerProducts().addInventory();
        break;
      case "Add New Product":
        new ManagerProducts().createProduct();
        break;
      default:
        console.log("OPS!");
        break;
    }
  });

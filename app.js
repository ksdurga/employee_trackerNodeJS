const mysql = require("mysql");
let CRUD = require("./db_CRUD");
const inquirer = require("inquirer");



const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "employee_managementDB"
});

const initialize = () => {
  inquirer.prompt({
    type: "list",
    message: "Pick an action",  //should have used id because there could be duplicate data
    choices: ["View Data", "Add Data", "Update Data"],
    name: "action"
  }).then(function(answers) {
    switch (answers.action) {
      case "View Data":
        CRUD.viewData();
      break;
      case "Add Data":
        CRUD.addData();
      break;
      case "Update Data":
        CRUD.updateData();;
      break;
    };
  });
};


connection.connect(function(err) {
  if (err) throw err;
  console.log("\n" + "connected as id " + connection.threadId + "\n");
  initialize();
});
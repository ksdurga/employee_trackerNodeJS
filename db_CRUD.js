const inquirer = require("inquirer");
const mysql = require("mysql");

//connect to database
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

//QUESTION ARRAYS
let employeeQuestions = [
  {
    type: "input",
    message: "Enter first name of employee",
    name: "firstName"
  },
  {
    type: "input",
    message: "Enter last name of employee",
    name: "lastName"
  },
  {
    type: "input",
    message: "Enter role ID of employee",
    name: "roleId"
  },
  {
    type: "input",
    message: "Enter manager ID of employee",
    name: "managerId"
  }
];




//EMPLOYEE TABLE STUFF
//add new employee
const addEmployee = (item) => {
  console.log("Adding employee...\n");
  let query = connection.query("INSERT INTO employees SET ?", 
    {
      first_name: item.firstName,  //should have used id because there could be duplicate data
      last_name: item.lastName,
      role_id: item.roleId,
      manager_id: item.managerId
    },
    function(err, res) {
      if (err) throw err;
    }
  );

  // logs the actual query being run
  viewEmployees();
};

const askEmployee = () => {
  inquirer.prompt(employeeQuestions).then(function(data){
    addEmployee(data);
  })
};

function updateEmployee(item) {
  console.log("Updating Employee...\n");
  let query = connection.query(
    "UPDATE employees SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?",
    [
      {
        first_name: item.firstName,
        last_name: lastName,
        role_id: roleId,
        manager_id: managerId
      },
      {
        id: item.id //should have used id because there could be duplicate data
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products updated!\n");
      sellProduct(item);

      // Call deleteProduct AFTER the UPDATE completes
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

function deleteEmployee(item) {
  console.log("Success!  The employee has been deleted...\n");
  connection.query(
    "DELETE FROM employees WHERE ?",
    {
      id: item.id
    },
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " SOLD!\n");
      // Call readProducts AFTER the DELETE completes
      readProducts();
      connection.end();
    }
  );
}

function viewEmployees() {
  console.log("All employees:\n");
  connection.query("SELECT * FROM employees", function(err, res) {
    if (err) throw err;
    console.table(res)
    console.log("-----------------------------------");
    // Log all results of the SELECT statement
  });
};

//ROLES
function viewRoles() {
  console.log("All roles:\n");
  connection.query("SELECT * FROM roles", function(err, res) {
    if (err) throw err;
    console.table(res)
    console.log("-----------------------------------");
    // Log all results of the SELECT statement
  });
};

//DEPARTMENTS
function viewDepartments() {
  console.log("All departments:\n");
  connection.query("SELECT * FROM departments", function(err, res) {
    if (err) throw err;
    console.table(res)
    console.log("-----------------------------------");
    // Log all results of the SELECT statement
  });
};

const addDepartment = (item) => {
  console.log("Adding employee...\n");
  let query = connection.query("INSERT INTO departments SET ?", 
    {
      name: item.name,
    },
    function(err, res) {
      if (err) throw err;
    }
  );

  // logs the actual query being run
  viewEmployees();
};

const askDepartment = () => {
  inquirer.prompt(departmentQuestions).then(function(data){
    addDepartment(data);
  })
};

//ALL
const viewData = () => {
  inquirer.prompt({
    type: "list",
    message: "Pick an action",  //should have used id because there could be duplicate data
    choices: ["View Employees", "View Roles", "View Departments"],
    name: "action"
  }).then(function(answers) {
    switch (answers.action) {
      case "View Employees":
        viewEmployees();
      break;
      case "View Roles":
        viewRoles();
      break;
      case "View Departments":
        viewDepartments();;
      break;
    }
  });
};

const addData = () => {
  inquirer.prompt({
    type: "list",
    message: "Pick an action",
    choices: ["Add new employee", "Add new department", "Add new role"],
    name: "action"
  }).then(function(answers) {
    switch (answers.action) {
      case "Add new employee":
        askEmployee();
      break;
      case "Add new department":
        addDepartment();
      break;
      case "Add new role":
        addRole();
      break;
    }
  })
}

module.exports = {
  viewData:viewData,
  viewEmployees:viewEmployees,
  viewDepartments:viewDepartments,
  viewRoles:viewRoles,
  addData:addData,
  addEmployee:addEmployee,
  askEmployee:askEmployee
  // addDepartment:addDepartment,
  // addRole:addRole
};

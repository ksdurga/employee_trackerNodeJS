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

let departmentQuestions = [
  {
    type: "input",
    message: "Enter department name",
    name: "name"
  }
];

let roleQuestions = [
  {
    type: "input",
    message: "Enter role title",
    name: "title"
  },
  {
    type: "number",
    message: "Enter salary amount",
    name: "salary"
  },
  {
    type: "input",
    message: "Enter department ID",
    name: "departmentID"
  }
];


/*EMPLOYEE TABLE STUFF*/
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
    "UPDATE employees SET ? WHERE ?",
    [
      {
        first_name: item.firstName,
        last_name: item.lastName,
        role_id: item.roleId,
        manager_id: managerId
      },
      {
        id: item.name
      }
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " products updated!\n");
      viewEmployees();
    }
  );
};

let employeeList = () => {
  connection.query("SELECT * FROM employees", function(err, res) {
    if (err) throw err;
    return res.first_name
    // Log all results of the SELECT statement
  });
}

let updateEmployeePrompt = () => {
  inquirer.prompt({
    type: "list",
    message: "Choose an employee to update",
    choices: employeeList(),
    name: "name"
  }).then(function(data){
    updateEmployee(data);
  })
};

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
    }
  );
};

function viewEmployees() {
  console.log("All employees:\n");
  connection.query("SELECT * FROM employees", function(err, res) {
    if (err) throw err;
    console.table(res)
    console.log("-----------------------------------");
    // Log all results of the SELECT statement
  });
};

/*ROLES*/
function viewRoles() {
  console.log("All roles:\n");
  connection.query("SELECT * FROM roles", function(err, res) {
    if (err) throw err;
    console.table(res)
    console.log("-----------------------------------");
    // Log all results of the SELECT statement
  });
};

const addRole = (item) => {
  console.log("Adding role...\n");
  let query = connection.query("INSERT INTO roles SET ?", 
    {
      title: item.title,  //should have used id because there could be duplicate data
      salary: item.salary,
      department_id: item.departmentId
    },
    function(err, res) {
      if (err) throw err;
    }
  );

  // logs the actual query being run
  viewRoles();
};

const askRole = () => {
  inquirer.prompt(roleQuestions).then(function(data){
    addRole(data);
  })
};

/*DEPARTMENTS*/
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
  console.log("Adding department...\n");
  let query = connection.query("INSERT INTO departments SET ?", 
    {
      name: item.name,
    },
    function(err, res) {
      if (err) throw err;
    }
  );

  // logs the actual query being run
  viewDepartments();
};

const askDepartment = () => {
  inquirer.prompt(departmentQuestions).then(function(data){
    addDepartment(data);
  })
};

/*ALL*/
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
        askDepartment();
      break;
      case "Add new role":
        askRole();
      break;
    }
  })
};

const updateData = () => {
  inquirer.prompt({
    type: "list",
    message: "Pick an action",
    choices: ["Update an employee", "Update a department", "Update a role"],
    name: "action"
  }).then(function(answers) {
    switch (answers.action) {
      case "Update an employee":
        updateEmployeePrompt();
      break;
      case "Update a department":
        updateDepartment();
      break;
      case "Update a role":
        updateRole();
      break;
    }
  })
};

module.exports = {
  viewData:viewData,
  viewEmployees:viewEmployees,
  viewDepartments:viewDepartments,
  viewRoles:viewRoles,
  addData:addData,
  addEmployee:addEmployee,
  askEmployee:askEmployee,
  askDepartment:askDepartment,
  askRole:askRole,
  updateData:updateData
  // addDepartment:addDepartment,
  // addRole:addRole
};

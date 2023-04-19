/* eslint-disable linebreak-style */
/* eslint-disable max-len */

// requires dotenv to use .env file
require('dotenv').config();

// requires inquirer
const inquirer = require('inquirer');

// questions for CLI
const questions = require('./questions');
const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  // eslint-disable-next-line no-new-wrappers
  password: process.env.DB_PASSWORD + '#',
  database: process.env.DB_NAME,
});
db.connect(function(error) {
  if (error) throw error;
  // calling mainMenu here so that it ensures a connection is established to the db.
  mainMenu();
});

// sets the inquirer prompt to the questions array and conditional code for each selection
const mainMenu = () => {
  inquirer.prompt(questions).then((answers) => {
    switch (answers.activity) {
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update employee role':
        updateEmployeeRole();
        break;
        // default :
        // process.exit()
    }
  });
};
// functions to match the different cases above
const viewAllDepartments = () => {
  db.query('SELECT * FROM departments', function(err, rows) {
    if (err) throw err;
    console.table(rows);
    mainMenu();
  });
};

const viewAllRoles = () => {
  db.query('SELECT * FROM roles', function(err, rows) {
    if (err) throw err;
    console.table(rows);
    mainMenu();
  });
};

const viewAllEmployees = () => {
  db.query('SELECT * FROM employees JOIN roles ON employees.role_id = roles.id;', function(err, rows) {
    if (err) throw err;
    console.table(rows);
    mainMenu();
  });
};

const addDepartment = () => {
  inquirer
      .prompt({
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department you want to add?',
        validate: (input) => {
          if (input.length < 3) {
            return 'The name must be at least 3 characters long';
          }
          return true;
        },
      }).then((answers) => {
        db.query(`INSERT INTO departments (department_name) VALUES ('${answers.departmentName}')`, mainMenu);
        mainMenu();
      });
};

const addRole = () => {
  inquirer
      .prompt([{
        type: 'input',
        name: 'newRole',
        message: 'What is the name of the role you want to add?',
        validate: (input) => {
          if (input.length < 3) {
            return 'The name must be at least 3 characters long';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'newSalary',
        message: 'What is the salary of the role you want to add?',
        validate: (input) => {
          const isValid = /^\d+$/.test(input);
          if (!isValid) {
            return 'Please enter numbers only';
          }
          return true;
        },
      }, {
        type: 'input',
        name: 'newRoleDep',
        message: 'In which department will the new role be? Please enter the department ID.',
        validate: (input) => {
          const isValid = /^\d+$/.test(input);
          if (!isValid) {
            return 'Please enter numbers only';
          }
          return true;
        },
      },
      ]).then((answers) => {
        db.query(
            `INSERT INTO roles (title, salary, department_id) VALUES ('${answers.newRole}', '${answers.newSalary}', '${answers.newRoleDep}')`);
        mainMenu();
      });
};

const addEmployee = () => {
  inquirer
      .prompt([{
        type: 'input',
        name: 'newFirst',
        message: 'What is the first name of the employee you want to add?',
      },
      {
        type: 'input',
        name: 'newLast',
        message: 'What is the last name of the employee you want to add?',
      },
      {
        type: 'input',
        name: 'newEmpRole',
        message: 'What is the role id of the new employee?',
        validate: (input) => {
          const isValid = /^\d+$/.test(input);
          if (!isValid) {
            return 'Please enter numbers only';
          }
          return true;
        },
      },
      {
        type: 'input',
        name: 'newEmpMan',
        message: 'What is the manager id of the new employee?',
        validate: (input) => {
          const isValid = /^\d+$/.test(input);
          if (!isValid) {
            return 'Please enter numbers only';
          }
          return true;
        },
      },
      ]).then((answers) => {
        db.query(
            `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answers.newFirst}', '${answers.newLast}', '${answers.newEmpRole}', '${answers.newEmpMan}')`);
        mainMenu();
      });
};

const updateEmployeeRole = () => {
  inquirer
      .prompt([{
        type: 'input',
        name: 'employeeId',
        message: 'What is the id of the employee you want to update?',
        validate: (input) => {
          const isValid = /^\d+$/.test(input);
          if (!isValid) {
            return 'Please enter numbers only';
          }
          return true;
        },
      },
      ])
      .then((answers) => {
        const {employeeId, newRoleId} = answers;
        db.query(
            `UPDATE employees SET role_id = '${newRoleId}' WHERE id = '${employeeId}'`);
        (err, result) => {
          if (err) throw err;
          console.log(result);
          mainMenu();
        };
      });
};


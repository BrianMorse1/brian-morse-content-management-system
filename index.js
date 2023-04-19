//requires dotenv to use .env file
require('dotenv').config();
//requires inquirer
const inquirer = require('inquirer');
//questions for CLI
const questions = require('./questions');
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});
db.connect(function(error){
    if(error)throw error
    //calling mainMenu here so that it ensures a connection is established to the db. 
    mainMenu();
});

//sets the inquirer prompt to the questions array and conditional code for each selection
const mainMenu = () => {
inquirer.prompt(questions).then(answers => {
    switch(answers.activity){
        case 'View all departments': 
        viewAllDepartments()
        break;
        case 'View all roles':
        viewAllRoles()
        break;
        case 'View all employees':
        viewAllEmployees()
        break;
        case 'Add a department':
        addDepartment()
        break;
        case 'Add a role':
        addRole()
        break;
        case 'Add an employee':
        addEmployee()
        break;
        case 'Update employee role':
        updateEmployeeRole()
        break;
        // default :
        // process.exit()
    }
})};
const viewAllDepartments = () => {
    db.query('SELECT * FROM departments', function(err, rows){
        if(err) throw err;
        console.table(rows);
        mainMenu(); 
    })
};

const viewAllRoles = () => {
    db.query('SELECT * FROM roles',  function(err, rows){
        if(err) throw err;
        console.table(rows);
        mainMenu();
})
};

const viewAllEmployees = () => {
    db.query('SELECT * FROM employees JOIN roles ON employees.role_id = roles.id;', function(err, rows){
        if(err) throw err;
        console.table(rows);
        mainMenu();
    })
};

const addDepartment = () => {
    inquirer
    .prompt({
        type: 'input',
        name: 'departmentName',
        message: 'What is the name of the department you want to add?',
        validate: (input) => {
            if(input.length < 3) {
                return 'The name must be at least 3 characters long';
            }
            return true;
        },
}).then ((answers) => {
    db.query(`INSERT INTO departments (department_name) VALUES ('${departmentName}')`, mainMenu);
    mainMenu();
});
};

const addRole = () => {
    inquirer
    .prompt({

}
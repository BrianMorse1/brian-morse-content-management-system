//requires inquirer
const inquirer = require('inquirer');
//questions for CLI
const questions = require('./questions');
const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});
db.connect(function(error){
    if(error)throw error
});

//sets the inquirer prompt to the questions array and conditional code for each selection
const mainMenu = () => {
inquirer.prompt(questions).then(answers => {
    switch(answers.activity){
        case 'View all departments': 
        viewAllDepartments()
        break;
        case 'View all roles' :
        viewAllRoles()
        break;
        case 'View all employees' :
        viewAllEmployees()
        break;
        // default :
        // process.exit()
    }
})};
const viewAllDepartments = () => {
    db.promise().query('SELECT * FROM departments')
    .then(rows => {
        console.log(rows);
        mainMenu(); 
    })
};

const viewAllRoles = () => {
    db.promise().query('SELECT * FROM roles')
    .then(rows => {
        console.log(rows);
        mainMenu();
    })
};

const viewAllEmployees = () => {
    db.promise().query('SELECT * FROM employees')
    .then(rows => {
        console.log(rows);
        mainMenu();
    })
};

mainMenu();
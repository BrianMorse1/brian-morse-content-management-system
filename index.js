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
    password: 'War57craft!@#',
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
    db.query('SELECT * FROM employees', function(err, rows){
        if(err) throw err;
        console.table(rows);
        mainMenu();
    })
};


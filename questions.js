const questions = [
    {
        type: 'list', 
        name: 'activity', 
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employess', 'Add a department', 'Add a role', 'Add an employee', 'Update employee role']
    }
]

module.exports = questions;
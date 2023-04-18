INSERT INTO departments (department_name)
VALUES ('Sales'), 
('Marketing'), 
('Finance'), 
('Human Resources'), 
('Legal'), 
('Public Relations');

INSERT INTO roles (title, salary, department_id)
VALUES 
('Human Resource Manager', 45000, 4), 
('Sales Manager', 50000, 1), 
('Sales Associate', 35000, 1), 
('Marketing Manager', 40000, 2), 
('Marketing Associate', 35000, 2), 
('Finance Manager', 55000, 3), 
('Finance Associate', 30000, 3), 
('Human Resources Associate', 35000, 4), 
('Senior Counsel', 100000, 5), 
('Junior Counsel', 75000, 5),
('Senior Communications Specialist', 60000, 6), 
('Junior Communications Specialist', 40000, 6);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Samantha', 'Kim', 1, null),
('Aisha', 'Choudhary', 2, 1),
('Gabriel', 'Silva', 3, 2),
('Bella', 'Nguyen', 4, 1),
('Chen', 'Ling', 5, 4),
('Dante', 'Santos', 6, 1),
('Omar', 'Ahmed', 7, 6),
('Lila', 'Garcia', 8, 1),
('Jared', 'Hernandez', 8, 1),
('Leah', 'Cohen', 9, 1),
('David', 'Lee', 10, 9),
('Maria', 'Gonzalez', 10, 9),
('Nina', 'Wu', 11, 1),
('Elias', 'Khalil', 12, 11),
('Sofia', 'Gomez', 12, 11);

INSERT INTO department(name)
VALUES 
    ("administrative"),
    ("regulatory"),
    ("public relations"),
    ("maintenance"),
    ("educational");

INSERT INTO role(title, salary, department_id)
VALUES
    ("janitor", 18.50, 4),
    ("teacher", 17, 5),
    ("clerk", 18.50, 3),
    ("principal", 30.25, 1),
    ("cook", 15.10, 2),
    ("disposal", 16.10, 4),
    ("Assistant", 14.10, 2),
    ("director", 22, 1);



    INSERT INTO employee(first_name, last_name, role_id, manager_id)
    VALUES
        ("mike", "jones", 4, NULL),
        ("chauncy", "lopez", 8, 1),
        ("lupe", "smith", 2, 1),
        ("george", "micheal", 2, 1),
        ("cameron", "lias", 7, 1),
        ("nikki", "juares",7 , 1),
        ("ellie", "resdonde",3 , 1),
        ("dumile", "ellis",5 , 2),
        ("nia", "petruvie",5 , 2),
        ("jovie", "castro", 6, 2),
        ("lindsy", "amile",1 , 2),
        ("brandon", "nunez",6 , 2),
        ("mike", "thomas", 3, 2);


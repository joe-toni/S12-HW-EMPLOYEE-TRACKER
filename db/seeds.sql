INSERT INTO departments(name)
VALUES 
    ("administrative"),
    ("functional"),
    ("silly"),
    ("lazy"),
    ("educational");

INSERT INTO roles(title, salary, department_id)
VALUES
    ("janitor", 18.50, 2),
    ("teacher", 17, 5),
    ("assistant", 18.50, 5),
    ("admin", 30.25, 4),
    ("cook", 15.10, 2);

    INSERT INTO employees(first_name, last_name, role_id, manager_id)
    VALUES
        ("mike", "jones", 4, NULL),
        ("chauncy", "lopez", 2, 1),
        ("lupe", "smith", 2, 1),
        ("george", "micheal", 3, 2),
        ("cameron", "lias", 3, 3),
        ("nikki", "juares", 5, 1),
        ("mike", "thomas", 3, 6);


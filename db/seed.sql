-- seed Users

-- seed Posts

-- seed Comments

INSERT INTO comment(body, user_id, post_id, created_at, updated_at) VALUES
("that's interesting", 1, 3, NOW(), NOW()), 
("I like that idea", 1, 1, NOW(), NOW()),
("that's good", 1, 2, NOW(), NOW());
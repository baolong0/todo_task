INSERT INTO member.user (first_name, last_name, email, password, role, is_deleted)
VALUES (${firstName}, ${lastName}, ${email}, ${password}, ${role}, ${isDeleted})
RETURNING id;

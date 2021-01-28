UPDATE member.user
SET 
    first_name = ${firstName},
    last_name = ${lastName},
    password = ${password}
WHERE
    id = ${userId}
RETURNING id;

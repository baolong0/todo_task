SELECT 
   id AS "id",
  first_name AS "firstName",
  last_name AS "lastName",
  email AS "email",
  password AS "password",
  role AS "role",
  is_deleted AS "isDeleted",
  created_at AS "createdAt",
  updated_at AS "updatedAt",
  deleted_at AS "deletedAt"
FROM member.user
WHERE email = ${email};

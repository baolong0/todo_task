UPDATE member.user
SET
	is_deleted = true
WHERE member.user.id = ${userId}
RETURNING member.user.is_deleted;
SELECT
    attachment.id AS id,
    attachment.name AS name,
    attachment.path AS path,
    attachment.created_at AS createdAt,
    attachment.updated_at AS updatedAt
FROM app.attachment as attachment
INNER JOIN app.task AS task ON attachment.task_id = task.id
WHERE task.id = ${taskId};
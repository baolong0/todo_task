SELECT
    task.id AS id,
    task.name AS name,
    task.due_time AS dueTime,
    task.status AS status
FROM app.task AS task
WHERE task.created_by = ${userId}
ORDER BY task.status ASC, task.due_time DESC;
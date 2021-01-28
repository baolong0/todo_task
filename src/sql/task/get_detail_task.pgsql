SELECT
    task.id AS id,
    task.name AS name,
    task.description as description,
    task.due_time AS dueTime,
    task.status AS status
FROM app.task AS task
WHERE task.id = ${taskId};
SELECT
    tag.id AS id,
    tag.name AS name
FROM app.tag AS tag
INNER JOIN app.task_tag AS task_tag ON tag.id = task_tag.tag_id
INNER JOIN app.task AS task ON task_tag.task_id = task.id
WHERE task.id = ${taskId};
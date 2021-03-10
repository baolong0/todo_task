SELECT
    activity.id AS id,
    activity.log AS log,
    activity.created_at AS createdAt,
    activity.updated_at AS updatedAt
FROM audit.activity as activity
INNER JOIN app.task AS task ON activity.task_id = task.id
WHERE task.id = ${taskId};
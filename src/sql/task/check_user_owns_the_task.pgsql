select attachment.id as id
from app.attachment as attachment 
INNER JOIN app.task AS task 
ON attachment.task_id = task.id
where attachment.id=${attachment_id} 
    and task_id=${task_id} 
    and created_by=${user_id};
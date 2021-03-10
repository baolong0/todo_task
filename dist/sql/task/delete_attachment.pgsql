update app.attachment 
set is_deleted = true ,
deleted_at = CURRENT_TIMESTAMP
where id=${attachment_id}
returning is_deleted;
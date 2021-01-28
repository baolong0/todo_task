import { DbUtils } from "Utils/dbUtils";

export const get_tasks_by_user_id = DbUtils.loadQueryFile("task/get_tasks_by_user_id.pgsql");
export const get_tags_by_task_id = DbUtils.loadQueryFile("task/get_tags_by_task_id.pgsql");
export const get_detail_task = DbUtils.loadQueryFile("task/get_detail_task.pgsql");
export const get_attachments_by_task_id = DbUtils.loadQueryFile("task/get_attachments_by_task_id.pgsql");
export const get_activities_by_task_id = DbUtils.loadQueryFile("task/get_activities_by_task_id.pgsql");
export const create_task_non_ref = DbUtils.loadQueryFile("task/create_task_non_ref.pgsql");
export const create_tag_by_name = DbUtils.loadQueryFile("task/create_tag_by_name.pgsql");
export const get_tag_by_name = DbUtils.loadQueryFile("task/get_tag_by_name.pgsql");
export const link_task_with_tag_by_id = DbUtils.loadQueryFile("task/link_task_with_tag_by_id.pgsql");
export const add_attachment = DbUtils.loadQueryFile("task/add_attachment.pgsql");
export const delete_attachment = DbUtils.loadQueryFile("task/delete_attachment.pgsql");
export const check_user_owns_the_task = DbUtils.loadQueryFile("task/check_user_owns_the_task.pgsql");

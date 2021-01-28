import { DbUtils } from "Utils/dbUtils";

export const create_user = DbUtils.loadQueryFile("user/create_user.pgsql");
export const get_user_by_id = DbUtils.loadQueryFile("user/get_user_by_id.pgsql");
export const update_user = DbUtils.loadQueryFile("user/update_user.pgsql");
export const login_user_check = DbUtils.loadQueryFile("user/login_user_check.pgsql");
export const remove_user = DbUtils.loadQueryFile("user/remove_user.pgsql");

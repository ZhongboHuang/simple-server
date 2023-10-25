export enum ApiErrorCode {
  SUCCESS = 200, // 成功
  USER_ID_INVALID = 1001, // 用户id无效
  USERNAME_EXIST = 1002, // 用户名已存在
  PERMISSION_EXIST = 1004, // 权限已存在
  ROLE_EXIST = 1005, // 角色已存在
  FORBIDDEN = 403, // 权限不足
}

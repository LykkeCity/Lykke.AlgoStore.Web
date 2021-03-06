// LIST OF ALGO-STORE PERMISSIONS

export default class Permissions {
  static readonly CREATE_ALGO = 'CreateAlgo';
  static readonly EDIT_ALGO = 'EditAlgo';
  static readonly DELETE_ALGO = 'DeleteAlgo';
  static readonly STOP_TEST = 'StopTest';
  static readonly GET_USER_ALGOS = 'GetAllUserAlgos';
  static readonly GET_USER_INSTANCES = 'GetInstancesForUser';
  static readonly ADD_TO_PUBLIC = 'AddToPublic';
  static readonly REMOVE_FROM_PUBLIC = 'RemoveFromPublic';
  static readonly UPDATE_USER_ROLE = 'UpdateUserRole';
  static readonly ASSIGN_MULTIPLE_PERMISSIONS_TO_ROLE = 'AssignMultiplePermissionToRole';
  static readonly ASSIGN_USER_ROLE= 'AssignUserRole';
  static readonly CREATE_COMMENT= 'CreateComment';
  static readonly DELETE_ALGO_INSTANCE_DATA = 'DeleteAlgoInstanceDataAsync';
  static readonly DELETE_COMMENT = 'DeleteComment';
  static readonly DELETE_USER_ROLE = 'DeleteUserRole';
  static readonly EDIT_COMMENT = 'EditComment';
  static readonly GET_ALGO_INSTANCE_DATA = 'GetAlgoInstanceDataAsync';
  static readonly GET_ALGO_INSTANCE_STATISTIC = 'GetAlgoInstanceStatisticsAsync';
  static readonly GET_ALGO_METADATA = 'GetAlgoInformation';
  static readonly GET_ALGO_RATING = 'GetAlgoRating';
  static readonly GET_ALL_ALGO_INSTANCE_DATA = 'GetAllAlgoInstanceDataAsync';
  static readonly GET_ALL_ALGOS = 'GetAllAlgos';
  static readonly GET_ALL_COMMENTS_FOR_ALGO = 'GetAllCommentsForAlgoAsync';
  static readonly GET_ALL_PERMISSIONS = 'GetAllPermissions';
  static readonly GET_ALL_TRADES_FOR_ALGO = 'GetAllTradesForAlgoInstanceAsync';
  static readonly GET_ALL_USER_ROLES = 'GetAllUserRoles';
  static readonly GET_ALL_USERS_WITH_ROLES = 'GetAllUsersWithRoles';
  static readonly GET_PERMISSIONS_BY_ROLE_ID = 'GetPermissionsByRoleId';
  static readonly GET_ROLE_BY_ID = 'GetRoleById';
  static readonly GET_TEST_TAIL_LOG = 'GetTestTailLog';
  static readonly GET_UPLOAD_STRING = 'GetUploadString';
  static readonly GET_USER_BY_ID_WITH_ROLES = 'GetUserByIdWithRoles';
  static readonly RATE_ALGO = 'RateAlgo';
  static readonly REVOKE_PERMISSIONS = 'RevokeMultiplePermissions';
  static readonly REVOKE_ROLE = 'RevokeRoleFromUser';
  static readonly SAVE_ALGO_INSTANCE_DATA = 'SaveAlgoInstanceDataAsync';
  static readonly SAVE_USER_ROLE = 'SaveUserRole';
  static readonly RUN_FAKE_TRADE = 'SaveAlgoFakeTradingInstanceDataAsync';
  static readonly EDIT_INSTANCE_NAME = 'SetInstanceNameAsync';
  static readonly GET_FREE_WALLETS = 'GetAvailableClientWallets';
}

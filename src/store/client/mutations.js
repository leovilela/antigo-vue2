export const SET_USER_PERMISSIONS = 'CLIENT/SET_USER_PERMISSIONS'
export const SET_SYSTEM_PERMISSIONS = 'CLIENT/SET_SYSTEM_PERMISSIONS'

export default {
  [SET_USER_PERMISSIONS](state, permissions) {
    state.userPermissions = permissions
  },
  [SET_SYSTEM_PERMISSIONS](state, permissions) {
    state.systemPermissions = permissions
  }
}

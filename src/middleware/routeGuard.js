export default function checkAccess(store, code) {
    const ROLE_OWNER = "ec_owner";
    const ROLE_ADMIN = "lf_admin";

    if (store.state.roles.find(role => role === ROLE_OWNER || role === ROLE_ADMIN)) {
      if (!store.state.client.systemPermissions.find(permission => permission.code === code)) {
          return false;
      }
    } else {
      if (!store.state.client.userPermissions.find(permission => permission === code)) {
        return false;
      }
    }
    return true;
};

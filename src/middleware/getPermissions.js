export default async function ({ store, route }) {
  const token = store.state.auth.accessToken;
  if (route.query.embedded === "true" || !token) return;
  await store.dispatch('client/getPermissions')
}

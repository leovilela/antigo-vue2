export default async function ({ store, route, $axios }) {
  const token = store.state.auth.accessToken;
  if (route.query.embedded === "true" || !token) return;

  const pagesAuth = [
    "/meus-dados-cadastrais",
    "/login",
    `/nova-senha/?guid=${route.query.guid}`,
  ];
  if (pagesAuth.includes(route.fullPath)) return;

  return store.dispatch("affiliate/getAffiliate")
    .then((data) => {
      if (data.departmentID > 0 && data.affiliateStatusID > 0) {
        store.commit("toggleTransactions", true);
      } else {
        store.commit("toggleTransactions", false);
      }
      store.commit("gravaAfiliado", { affiliate: data });
      return store.dispatch("affiliate/getContacts");
    })
    .then(() => {
      return store.dispatch("affiliate/getResponsible");
    })
    .catch((err) => {
      store.commit("gravaAfiliado", { affiliate: null });
      store.commit('toggleLoans', false)
      if (err.status === 204) {
        return
      }
      console.error(err);
    });
}

export default function ({ store, route }) {
  store.commit("clearIntervalFc");
  const pagesAuth = [
    "/",
    "/login",
    "/login/acesso",
    "/novo-cadastro",
    "/redefinir-senha/info",
    `/redefinir-senha/${route.params.guide}`,
    "/redefinir-senha/nova-senha",
  ];
  if (!(pagesAuth.includes(route.fullPath) || route.query.embedded === "true")) {
    // store.dispatch("setIntervalAuth");
  }
}

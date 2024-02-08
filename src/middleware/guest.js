export default function ({
  store,
  redirect,
  route,
}) {
  const pagesAuth = [
    "/",
    "/login",
    "/login/acesso",
    "/novo-cadastro",
    "/redefinir-senha/info",
    `/redefinir-senha/${route.params.guide}`,
    "/redefinir-senha/nova-senha",
    "/redefinir-senha/vencida",
    "/definir-senha/info",
    `/definir-senha/${route.params.guide}`,
    "/definir-senha/nova-senha",
    "/definir-senha/vencida",
    `/formalizacao/${route.params.registerKey}/?endpoint=${route.query.endpoint}`,
    `/nova-senha/?guid=${route.query.guid}`,
  ];
  if (!(pagesAuth.includes(route.fullPath) || route.query.embedded === "true") && !store.state.auth.accessToken) {
    redirect("/login");
  }
}

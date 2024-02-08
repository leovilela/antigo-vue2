const errorCodes = [
  { status: 401, message: "Solicitação não autorizada" },
  { status: 403, message: "Solicitação não permitida" },
  { status: 400, message: "Solicitação com valor inválido" },
  { status: 404, message: "Solicitação não encontrada" },
  { status: 412, message: "Solicitação não valida" },
  { status: 415, message: "Solicitação não formatada" },
  { status: 500, message: "Algo de errado com a solicitação" },
];

export default async function ({
  $axios, store, route, redirect,
}) {
  let isAlreadyFetchingAccessToken = false;
  let numberOfRequest = 0;
  let subscribers = [];
  function onAccessTokenFetched(accessToken) {
    subscribers = subscribers.filter(callback => callback(accessToken));
  }

  function addSubscriber(callback) {
    subscribers.push(callback);
  }

  const getErrorWithoutResponse = (error) => {
    const code = error.message.match(/\d+/g);
    if (!code[0]) {
      throw error.response;
    }
    const errorObj = errorCodes.find(errorCode => errorCode.status == code);
    errorObj.response = error.response.data;
    return Promise.reject(error);
  };


  $axios.onRequest((config) => {
    const accessToken = store.state.auth.accessToken;
    const systemToken = store.state.auth.systemToken;
    config.headers.common["Access-Control-Allow-Origin"] = "*";
    config.headers.common["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE";
    config.headers.common["Access-Control-Allow-Headers"] = "Authorization, x-xsrf-token, Access-Control-Allow-Headers, Origin, Accept, X-Requested-With";
    config.headers.common["Access-Control-Expose-Headers"] = "X-Pagination, Location, X-Kuma-Revision";

    if (route.fullPath.includes("/nova-senha/?guid") && systemToken) {
      config.headers.common.Authorization = `Bearer ${systemToken.access_token}`;
      return;
    }

    if (!accessToken) {
      return;
    }

    config.headers.common.Authorization = `Bearer ${accessToken}`;
  });

  $axios.onError((error) => {
    // const originalRequest = config;
    if (!error.response) {
      console.warn(`Falha ao executar a requisição`);
      return Promise.reject(error);
    }
    // errorObj.response = response.data;

    const { config, response } = error;
    const originalRequest = config;
    const errorObj = errorCodes.find(errorCode => errorCode.status === response.status);

    if (!errorObj) getErrorWithoutResponse(error);
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
      `/financiamentos/formalizacao/${route.params.registerKey}/?endpoint=${route.query.endpoint}`,
      "/nova-senha/",
    ];
    if (pagesAuth.includes(location.pathname)) {
      return Promise.reject(error);
    }
    if (response.status === 401) {
      if (originalRequest.url.includes("/token")) {
        store.dispatch('logout');

        redirect("/login");
        return Promise.reject(error);
      }
      if (!isAlreadyFetchingAccessToken) {
        isAlreadyFetchingAccessToken = true;
        if (numberOfRequest === 3) {
          return Promise.reject(error);
        }
        store.dispatch("renewToken")
        .then((accessToken) => {
          isAlreadyFetchingAccessToken = false;
          numberOfRequest += 1
          onAccessTokenFetched(accessToken);
        })
        .catch(error => {
          console.error(error);
          store.dispatch('logout');
          redirect("/login");
        })
      }

      const retryOriginalRequest = new Promise((resolve) => {
        addSubscriber((accessToken) => {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          resolve($axios(originalRequest));
          numberOfRequest = 0
        });
      });
      return retryOriginalRequest;
    }
    console.warn(`Error N°: ${errorObj.status}| Msg: ${errorObj.message} | Stack: ${JSON.stringify(error.response.data)}`);
    return Promise.reject(error);
  });
}

import {
  commitUserAuthenticated,
  decodeToken,
} from "../utils/auth.utils";

export default {
  async login({ commit }, { username, password }) {
    try {
      commit("limpaLogin");
      const tokenService = this.$services.auth.login(username, password);
      const keyAuthService = this.$services.auth.getAuthKey();
      const [tokenAuth, keyAuth] = await Promise.all([tokenService, keyAuthService]);
      const tokenDecoded = decodeToken(tokenAuth.access_token, keyAuth);

      commitUserAuthenticated(commit, tokenDecoded, keyAuth);
      const localDate = new Date();
      localDate.setSeconds(tokenDecoded.exp - tokenDecoded.nbf);
      commit("setToken", {
        access_token: tokenAuth.access_token,
        refresh_token: tokenAuth.refresh_token,
        token_type: tokenAuth.token_type,
        diffTime: tokenDecoded.exp - tokenDecoded.nbf,
        expiresTimeToken: localDate,
      });
      commit("setRoles", {
        roles: tokenDecoded.role,
      });
    } catch (error) {
      console.log(error);
      throw error.response ? error.response.data.error : error;
    }
  },
  async renewToken({ commit, state, dispatch }) {
    const keyAuth = await this.$services.auth.getAuthKey();
    const token = await this.$services.auth.renewAuth(state.auth.refreshToken);
    if (!token) {
      return dispatch('logout')
    }
    const tokenDecoded = decodeToken(token.access_token, keyAuth);
    commitUserAuthenticated(commit, tokenDecoded, keyAuth);
    const localDate = new Date();
    localDate.setSeconds(tokenDecoded.exp - tokenDecoded.nbf);
    commit("setToken", {
      access_token: token.access_token,
      refresh_token: token.refresh_token,
      token_type: token.token_type,
      diffTime: tokenDecoded.exp - tokenDecoded.nbf,
      expiresTimeToken: localDate,
    });
    console.info('Token Renewed')
    return Promise.resolve(token.access_token)
  },
  logout({ commit }) {
    commit("autenticado", false);
    commit("removeAuth");
    commit("limpaLogin");
  },

  nuxtClientInit() {
    console.info(`App Version: ${process.env.VERSION}`);

  },
  externalProductPayment({ commit }, payload) {
    commit("externalProductPayment", payload);
  },
};

const errorCodes = [
  { 401: { text: "Usuário não autorizado!" } },
  { 403: { text: "Usuário não permitido!" } },
  { 400: { text: "Solicitação não respondida!" } },
  { 404: { text: "Solicitação não encontrada!" } },
  { 412: { text: "Solicitação não valida!" } },
  { 415: { text: "Solicitação mal formatada" } },
  { 500: { text: "Resposta de solicitação com problema" } },
];

export class BaseService {
  constructor($axios, $store) {
    this.$axios = $axios;
    this.$store = $store;
  }

  async post(url, req, opts = {}) {
    try {
      const response = await this.$axios.post(url, req, opts);

      if (response.status === 204) {
        throw Object.assign({
          status: 204,
        });
      }
      if (opts.getHeaders) {
        return { data: response.data, headers: response.headers };
      }
      return response.data;
    } catch (error) {
      const errorCode = errorCodes.find(
        errCode => Object.keys(errCode)[0] == error.status,
      );
      if (errorCode) {
        error.response.message = errorCode.text;
      }
      throw error;
    }
  }

  async put(url, req, opts = {}) {
    try {
      const response = await this.$axios.put(url, req, opts);

      if (response.status === 204) {
        throw Object.assign({
          status: 204,
        });
      }
      if (opts.getHeaders) {
        return { data: response.data, headers: response.headers };
      }
      return response.data;
    } catch (error) {
      const errorCode = errorCodes.find(
        errCode => Object.keys(errCode)[0] == error.status,
      );
      if (errorCode) {
        error.response.message = errorCode.text;
      }
      throw error;
    }
  }

  async get(url, opts = {}) {
    try {
      const response = await this.$axios.get(url, opts);
      if (response.status === 204) {
        throw Object.assign({
          status: 204,
        });
      }
      if (opts.getHeaders) {
        return { data: response.data, headers: response.headers };
      }
      return response.data;
    } catch (error) {
      const errorCode = errorCodes.find(
        errCode => Object.keys(errCode)[0] == error.status,
      );
      if (errorCode) {
        error.response.message = errorCode.text;
      }
      throw error;
    }
  }
}

import account from "../utils/endpoints/account";
import {
  authHeaders,
} from "../utils/auth.utils";
import crypto from "crypto";
import isIE from "../utils/isIE.utils";

function base64URLEncode(url) {
  return url.toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

function sha256(buffer) {
  return crypto
    .createHash("sha256")
    .update(buffer)
    .digest();
}

const verifier = base64URLEncode(crypto.randomBytes(32));
const challenge = base64URLEncode(sha256(verifier));


export class AuthService {
  constructor($axios, $store, router) {
    this.$axios = $axios;
    this.$store = $store;
    this.$router = router;
  }

  async renewAuth(code) {
    try {
      const headers = authHeaders;
      const sendCode = `grant_type=refresh_token&client_id=listofacil&refresh_token=${code}`;
      const response = await this.$axios
        .post(process.env.TOKEN_URL, sendCode, {
          mode: "no-cors",
          headers,
        });
        return response.data
    } catch (error) {
      console.log(error);
    }
  }

  async getAuthKey() {
    try {
      const authKey = await this.$axios
        .get(process.env.AUTH_PK_URL);
      return authKey.data;
    } catch (error) {
      throw error;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  encodePassword(password) {
    // eslint-disable-next-line global-require
    const NodeRSA = require("node-rsa");
    const key = new NodeRSA(process.env.AUTH_SIMPLE_KEY);
    return encodeURIComponent(key.encrypt(password, "base64"));
  }

  logout() {
    this.$store.dispatch("logout");
    this.$router.push("/login");
  }

  async signup(document,
    login,
    email,
    password,
    phone,
    recaptcha) {
    const formData = new FormData();
    formData.append("document", document);
    formData.append("login", login);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("g-recaptcha-response", recaptcha);

    try {
      const responseSignup = await this.$axios
        .post(`${process.env.API_AFFILIATE}/affiliates`, formData, {
          mode: "no-cors",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      switch (responseSignup.status) {
        case 201:
          return responseSignup.data;
        case 500:
          throw Object.assign({}, {
            message: "USER_REGISTRATION_ERROR",
            response: responseSignup,
          });
        default:
          throw Object.assign({}, {
            message: "CAPTCHA_EXPIRE_ERROR",
            response: responseSignup,
          });
      }
    } catch (error) {
      throw error;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  async loginIE(username, password, getCode) {
    try {
      const myInit = {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        },
        mode: "no-cors",
        cache: "default",
        body: getCode,
      };

      let responseCodeToken = await fetch(process.env.AUTH_URL, myInit);
      console.log({
        responseCodeToken,
      });

      responseCodeToken = await responseCodeToken.json();

      const clearCode = encodeURIComponent(responseCodeToken.code.trim());
      const sendCode = `grant_type=authorization_code&code_verifier=${verifier}&client_id=listofacil&code=${clearCode} `;
      const headersCode = {
        method: "POST",
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Credentials": "true",
          "Access-Control-Allow-Methods": "POST, PUT, GET, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
        },
        mode: "no-cors",
        cache: "default",
        body: sendCode,
      };

      let responseToken = await fetch(process.env.TOKEN_URL, headersCode);

      responseToken = await responseToken.json();

      return responseToken;
    } catch (error) {
      throw error;
    }
  }

  async login(username, password) {
    const port = process.env.SITE_PORT != false ? `%2F${process.env.SITE_PORT}` : "";
    const headers = authHeaders;
    let responseToken = "";
    const getCode = `response_type=code&client_id=listofacil&redirect_uri=${process.env.SITE_URL}%2Flogin&state=foobar&grant_type=implicit&username=${
      username
      }&password=${
      password
      }&code_challenge=${challenge}&code_challenge_method=S256`;
    if (isIE()) {
      return this.loginIE(username, password, getCode);
    }
    try {
      const responseCodeToken = await this.$axios
        .post(process.env.AUTH_URL, getCode, {
          mode: "no-cors",
          headers,
        });

      if (responseCodeToken) {
        const clearCode = encodeURIComponent(responseCodeToken.data.code.trim());
        const sendCode = `grant_type=authorization_code&code_verifier=${verifier}&client_id=listofacil&code=${clearCode} `;
        responseToken = await this.$axios.post(process.env.TOKEN_URL, sendCode, {
          mode: "no-cors",
          headers,
        });
        return responseToken.data ? responseToken.data : responseToken;
      }
      return false;
    } catch (error) {
      throw error;
    }
  }

  async validateRequestLogin(guid) {
    try {
      const response = await this.$axios.get(account.login.validateRequest(guid));
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getSystemToken() {
    const params = {
      grant_type: process.env.GRANT_SYSTEM_TYPE,
      client_id: process.env.CLIENT_SYSTEM_ID,
      client_secret: process.env.CLIENT_SYSTEM_SECRET,
      scope: process.env.SCD_SCOPE,
    };
    const data = Object.entries(params)
      .map(([key, val]) => `${key}=${encodeURIComponent(val)}`)
      .join("&");

    try {
      const responseCodeToken = await this.$axios.post(
        process.env.TOKEN_URL,
        data,
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
        },
      );
      return responseCodeToken.data;
    } catch (error) {
      throw error;
    }
  }

  async changePassword({ idRequest, password, passwordConfirm }) {
    try {
      const response = await this.$axios.put(account.login.changePassword(), {
        idRequest,
        password,
        passwordConfirm,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

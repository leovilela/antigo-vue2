import { SET_USER } from "../store/auth/mutations";
import jwt from "jsonwebtoken";

export const commitUserAuthenticated = (commit, token) => {
  const userInfo = token.sub.split("@");
  const user = {
    id: userInfo[1],
    userId: token.sid,
    username: userInfo[0],
  };
  commit("gravaUsuario", {
    clientID: userInfo[1],
    userId: token.sid,
    userName: userInfo[0],
  });
  commit("autenticado", true);
  commit(`auth/${SET_USER}`, user);
};

export const decodeToken = (token, key) => jwt.verify(token, key, { algorithms: "RS256", ignoreNotBefore: true });


export const authHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/x-www-form-urlencoded",
  "Access-Control-Allow-Credentials": "true",
};
